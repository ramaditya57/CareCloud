import React, { useEffect, useContext } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AllAppointments = () => {
  const {
    aToken,
    appointments,
    cancelAppointment,
    getAllAppointments,
  } = useContext(AdminContext)

  const { slotDateFormat, calculateAge, currency } =
    useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <main className="w-full px-4 md:px-6 py-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <h1 className="mb-4 text-xl font-semibold text-gray-700">
          All Appointments
        </h1>

        {/* Table Card */}
        <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">

          {/* Table Header */}
          <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] gap-4 px-6 py-4 text-sm font-medium text-gray-600 border-b bg-gray-50 sticky top-0 z-10">
            <p>#</p>
            <p>Patient</p>
            <p>Age</p>
            <p>Date & Time</p>
            <p>Doctor</p>
            <p>Fees</p>
            <p className="text-center">Status</p>
          </div>

          {/* Table Body */}
          <div className="max-h-[75vh] overflow-y-auto text-sm">
            {appointments.length === 0 && (
              <p className="py-10 text-center text-gray-500">
                No appointments found.
              </p>
            )}

            {appointments.map((item, index) => (
              <div
                key={item._id}
                className="flex flex-wrap sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] gap-4 items-center px-6 py-4 border-b text-gray-600 hover:bg-gray-50 transition"
              >
                {/* Index */}
                <p className="hidden sm:block">
                  {index + 1}
                </p>

                {/* Patient */}
                <div className="flex items-center gap-2">
                  <img
                    src={item.userData.image}
                    alt=""
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <p className="font-medium text-gray-700">
                    {item.userData.name}
                  </p>
                </div>

                {/* Age */}
                <p className="hidden sm:block">
                  {calculateAge(item.userData.dob)}
                </p>

                {/* Date */}
                <p>
                  {slotDateFormat(item.slotDate)}, {item.slotTime}
                </p>

                {/* Doctor */}
                <div className="flex items-center gap-2">
                  <img
                    src={item.docData.image}
                    alt=""
                    className="w-8 h-8 rounded-full bg-gray-100 object-cover"
                  />
                  <p className="font-medium text-gray-700">
                    {item.docData.name}
                  </p>
                </div>

                {/* Fees */}
                <p>
                  {currency}
                  {item.amount}
                </p>

                {/* Status / Action */}
                <div className="flex justify-center">
                  {item.cancelled ? (
                    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-600">
                      Cancelled
                    </span>
                  ) : item.isCompleted ? (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-600">
                      Completed
                    </span>
                  ) : (
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      src={assets.cancel_icon}
                      alt="Cancel"
                      title="Cancel Appointment"
                      className="w-8 cursor-pointer hover:scale-110 transition"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default AllAppointments
