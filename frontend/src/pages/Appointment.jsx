import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import axios from 'axios'
import { toast } from 'react-toastify'

const Appointment = () => {
  const { docId } = useParams()
  const navigate = useNavigate()

  const {
    doctors,
    currencySymbol,
    backendUrl,
    token,
    getDoctosData,
  } = useContext(AppContext)

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  /* ---------------- Fetch Doctor ---------------- */
  useEffect(() => {
    if (doctors.length) {
      const info = doctors.find((doc) => doc._id === docId)
      setDocInfo(info)
    }
  }, [doctors, docId])

  /* ---------------- Generate Slots ---------------- */
  useEffect(() => {
    if (!docInfo) return

    const generateSlots = () => {
      const slots = []
      const today = new Date()

      for (let i = 0; i < 7; i++) {
        const currentDate = new Date(today)
        currentDate.setDate(today.getDate() + i)

        const endTime = new Date(currentDate)
        endTime.setHours(21, 0, 0, 0)

        if (i === 0) {
          currentDate.setHours(
            currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
          )
          currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
        } else {
          currentDate.setHours(10, 0, 0, 0)
        }

        const daySlots = []

        while (currentDate < endTime) {
          const time = currentDate.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })

          const dateKey = `${currentDate.getDate()}_${
            currentDate.getMonth() + 1
          }_${currentDate.getFullYear()}`

          const isAvailable =
            !docInfo.slots_booked?.[dateKey]?.includes(time)

          if (isAvailable) {
            daySlots.push({
              datetime: new Date(currentDate),
              time,
            })
          }

          currentDate.setMinutes(currentDate.getMinutes() + 30)
        }

        slots.push(daySlots)
      }

      setDocSlots(slots)
      setSlotIndex(0)
      setSlotTime('')
    }

    generateSlots()
  }, [docInfo])

  /* ---------------- Book Appointment ---------------- */
  const bookAppointment = async () => {
    if (!token) {
      toast.warning('Login to book appointment')
      return navigate('/login')
    }

    if (!slotTime) {
      toast.warning('Please select a time slot')
      return
    }

    const date = docSlots[slotIndex][0].datetime
    const slotDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime },
        { headers: { token } }
      )

      if (data.success) {
        toast.success(data.message)
        getDoctosData()
        navigate('/my-appointments')
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error(err.message)
    }
  }

  if (!docInfo) return null

  return (
    <main className="px-4 md:px-10 py-8">

      {/* ---------------- Doctor Card ---------------- */}
      <section className="flex flex-col md:flex-row gap-6">
        <img
          src={docInfo.image}
          alt={docInfo.name}
          className="w-full md:w-72 rounded-2xl bg-primary"
        />

        <div className="flex-1 rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="flex items-center gap-2 text-2xl font-semibold text-gray-700">
            {docInfo.name}
            <img src={assets.verified_icon} className="w-5" alt="" />
          </h2>

          <p className="mt-1 text-gray-600">
            {docInfo.degree} • {docInfo.speciality}
          </p>

          <span className="inline-block mt-2 rounded-full border px-3 py-1 text-xs">
            {docInfo.experience}
          </span>

          <div className="mt-4">
            <p className="flex items-center gap-1 font-medium text-gray-700">
              About <img src={assets.info_icon} className="w-3" alt="" />
            </p>
            <p className="mt-1 text-sm text-gray-600 leading-relaxed">
              {docInfo.about}
            </p>
          </div>

          <p className="mt-4 font-medium text-gray-700">
            Appointment Fee:{' '}
            <span className="text-gray-900">
              {currencySymbol}
              {docInfo.fees}
            </span>
          </p>
        </div>
      </section>

      {/* ---------------- Booking Slots ---------------- */}
      <section className="mt-10 md:ml-80">

        <h3 className="font-semibold text-gray-700 mb-4">
          Select Booking Slot
        </h3>

        {/* Days */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {docSlots.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setSlotIndex(index)
                setSlotTime('')
              }}
              className={`min-w-[64px] cursor-pointer rounded-full px-4 py-3 text-center transition ${
                slotIndex === index
                  ? 'bg-primary text-white'
                  : 'border bg-white text-gray-600'
              }`}
            >
              <p className="text-sm">
                {item[0] && daysOfWeek[item[0].datetime.getDay()]}
              </p>
              <p className="font-medium">
                {item[0] && item[0].datetime.getDate()}
              </p>
            </div>
          ))}
        </div>

        {/* Times */}
        <div className="flex gap-3 overflow-x-auto mt-4 pb-2">
          {docSlots[slotIndex]?.map((slot, index) => (
            <button
              key={index}
              onClick={() => setSlotTime(slot.time)}
              className={`rounded-full px-5 py-2 text-sm transition ${
                slot.time === slotTime
                  ? 'bg-primary text-white'
                  : 'border text-gray-600 hover:bg-gray-100'
              }`}
            >
              {slot.time.toLowerCase()}
            </button>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={bookAppointment}
          className="mt-6 rounded-full bg-primary px-20 py-3 text-sm font-medium text-white transition hover:scale-105"
        >
          Book Appointment
        </button>
      </section>

      {/* ---------------- Related Doctors ---------------- */}
      <section className="mt-20">
        <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
      </section>
    </main>
  )
}

export default Appointment
