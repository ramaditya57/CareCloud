import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext)
  const navigate = useNavigate()

  const [appointments, setAppointments] = useState([])
  const [payment, setPayment] = useState('')

  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

  const slotDateFormat = (slotDate) => {
    const [day, month, year] = slotDate.split('_')
    return `${day} ${months[Number(month) - 1]} ${year}`
  }

  /* ---------------- Fetch Appointments ---------------- */
  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/user/appointments`,
        { headers: { token } }
      )
      setAppointments(data.appointments.reverse())
    } catch (err) {
      toast.error(err.message)
    }
  }

  /* ---------------- Cancel Appointment ---------------- */
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } }
      )

      data.success ? toast.success(data.message) : toast.error(data.message)
      getUserAppointments()
    } catch (err) {
      toast.error(err.message)
    }
  }

  /* ---------------- Razorpay ---------------- */
  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      order_id: order.id,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            `${backendUrl}/api/user/verifyRazorpay`,
            response,
            { headers: { token } }
          )
          if (data.success) {
            toast.success('Payment successful')
            getUserAppointments()
            navigate('/my-appointments')
          }
        } catch (err) {
          toast.error(err.message)
        }
      }
    }
    new window.Razorpay(options).open()
  }

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/payment-razorpay`,
        { appointmentId },
        { headers: { token } }
      )
      data.success ? initPay(data.order) : toast.error(data.message)
    } catch (err) {
      toast.error(err.message)
    }
  }

  /* ---------------- Stripe ---------------- */
  const appointmentStripe = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/payment-stripe`,
        { appointmentId },
        { headers: { token } }
      )
      data.success
        ? window.location.replace(data.session_url)
        : toast.error(data.message)
    } catch (err) {
      toast.error(err.message)
    }
  }

  useEffect(() => {
    if (token) getUserAppointments()
  }, [token])

  return (
    <main className="px-4 md:px-10 py-8">

      <h1 className="text-xl font-semibold text-gray-700 border-b pb-3">
        My Appointments
      </h1>

      {appointments.length === 0 && (
        <p className="mt-10 text-center text-gray-500">
          No appointments found.
        </p>
      )}

      <div className="mt-6 space-y-6">
        {appointments.map((item) => (
          <div
            key={item._id}
            className="flex flex-col md:flex-row gap-6 rounded-2xl border bg-white p-5 shadow-sm"
          >
            {/* Doctor Image */}
            <img
              src={item.docData.image}
              alt={item.docData.name}
              className="w-32 rounded-xl bg-blue-50"
            />

            {/* Info */}
            <div className="flex-1 text-sm text-gray-600">
              <p className="text-lg font-semibold text-gray-800">
                {item.docData.name}
              </p>
              <p>{item.docData.speciality}</p>

              <p className="mt-2 font-medium text-gray-700">Address</p>
              <p>{item.docData.address.line1}</p>
              <p>{item.docData.address.line2}</p>

              <p className="mt-2">
                <span className="font-medium text-gray-700">
                  Date & Time:
                </span>{' '}
                {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 justify-end text-sm md:min-w-[200px]">

              {!item.cancelled && !item.payment && !item.isCompleted && payment !== item._id && (
                <button
                  onClick={() => setPayment(item._id)}
                  className="rounded-lg border py-2 hover:bg-primary hover:text-white transition"
                >
                  Pay Online
                </button>
              )}

              {payment === item._id && !item.payment && (
                <>
                  <button
                    onClick={() => appointmentStripe(item._id)}
                    className="rounded-lg border py-2 flex justify-center hover:bg-gray-100"
                  >
                    <img src={assets.stripe_logo} className="h-5" alt="Stripe" />
                  </button>

                  <button
                    onClick={() => appointmentRazorpay(item._id)}
                    className="rounded-lg border py-2 flex justify-center hover:bg-gray-100"
                  >
                    <img src={assets.razorpay_logo} className="h-5" alt="Razorpay" />
                  </button>
                </>
              )}

              {item.payment && !item.isCompleted && (
                <span className="rounded-lg bg-blue-100 py-2 text-center text-blue-600">
                  Paid
                </span>
              )}

              {item.isCompleted && (
                <span className="rounded-lg border border-green-500 py-2 text-center text-green-600">
                  Completed
                </span>
              )}

              {!item.cancelled && !item.isCompleted && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="rounded-lg border py-2 hover:bg-red-600 hover:text-white transition"
                >
                  Cancel Appointment
                </button>
              )}

              {item.cancelled && (
                <span className="rounded-lg border border-red-500 py-2 text-center text-red-500">
                  Appointment Cancelled
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

export default MyAppointments
