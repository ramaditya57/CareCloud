import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {
  const {
    doctors,
    changeAvailability,
    aToken,
    getAllDoctors,
  } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  return (
    <main className="px-4 md:px-6 py-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-xl font-semibold text-gray-700">
          All Doctors
        </h1>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-h-[80vh] overflow-y-auto pr-2">
          {doctors.length === 0 && (
            <p className="col-span-full text-center text-gray-500">
              No doctors found.
            </p>
          )}

          {doctors.map((item) => (
            <div
              key={item._id}
              className="group rounded-2xl border bg-white shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* Image */}
              <div className="overflow-hidden rounded-t-2xl bg-blue-50">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Info */}
              <div className="p-4 space-y-1">
                <h3 className="text-lg font-medium text-gray-800 truncate">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500 truncate">
                  {item.speciality}
                </p>

                {/* Availability */}
                <div className="mt-3 flex items-center justify-between">
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full ${
                      item.available
                        ? 'bg-green-100 text-green-600'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {item.available ? 'Available' : 'Unavailable'}
                  </span>

                  {/* Toggle */}
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={item.available}
                      onChange={() => changeAvailability(item._id)}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-primary transition-all"></div>
                    <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-5"></div>
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default DoctorsList
