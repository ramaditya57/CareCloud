import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorDashboard = () => {
  const {
    dToken,
    dashData,
    getDashData,
    cancelAppointment,
    completeAppointment,
  } = useContext(DoctorContext)

  const { slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getDashData()
    }
  }, [dToken])

  if (!dashData) return null

  return (
    <main className="px-4 md:px-6 py-6">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* ---------- Stats ---------- */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Earnings */}
          <div className="flex items-center gap-4 rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition">
            <img src={assets.earning_icon} alt="" className="w-14" />
            <div>
              <p className="text-2xl font-semibold text-gray-700">
                {currency} {dashData.earnings}
              </p>
              <p className="text-sm text-gray-500">Earnings</p>
            </div>
          </div>

          {/* Appointments */}
          <div className="flex items-center gap-4 rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition">
            <img src={assets.appointments_icon} alt="" className="w-14" />
            <div>
              <p className="text-2xl font-semibold text-gray-700">
                {dashData.appointments}
              </p>
              <p className="text-sm text-gray-500">Appointments</p>
            </div>
          </div>

          {/* Patients */}
          <div className="flex items-center gap-4 rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition">
            <img src={assets.patients_icon} alt="" className="w-14" />
            <div>
              <p className="text-2xl font-semibold text-gray-700">
                {dashData.patients}
              </p>
              <p className="text-sm text-gray-500">Patients</p>
            </div>
          </div>
        </section>

        {/* ---------- Latest Bookings ---------- */}
        <section className="rounded-2xl border bg-white shadow-sm">
          <div className="flex items-center gap-3 px-6 py-4 border-b">
            <img src={assets.list_icon} alt="" />
            <h2 className="font-semibold text-gray-700">
              Latest Bookings
            </h2>
          </div>

          <div className="divide-y">
            {dashData.latestAppointments.slice(0, 5).map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition"
              >
                {/* Patient Image */}
                <img
                  src={item.userData.image}
                  alt=""
                  className="w-10 h-10 rounded-full object-cover"
                />

                {/* Info */}
                <div className="flex-1 text-sm">
                  <p className="font-medium text-gray-800">
                    {item.userData.name}
                  </p>
                  <p className="text-gray-500">
                    Booking on {slotDateFormat(item.slotDate)}
                  </p>
                </div>

                {/* Status / Actions */}
                {item.cancelled ? (
                  <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-600">
                    Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-600">
                    Completed
                  </span>
                ) : (
                  <div className="flex gap-2">
                    <img
                      src={assets.cancel_icon}
                      alt="Cancel"
                      title="Cancel Appointment"
                      onClick={() => cancelAppointment(item._id)}
                      className="w-8 cursor-pointer hover:scale-110 transition"
                    />
                    <img
                      src={assets.tick_icon}
                      alt="Complete"
                      title="Mark as Completed"
                      onClick={() => completeAppointment(item._id)}
                      className="w-8 cursor-pointer hover:scale-110 transition"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

export default DoctorDashboard
