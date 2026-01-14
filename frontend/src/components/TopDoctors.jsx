import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  return (
    <section className="my-20 md:mx-10 px-4 text-[#262626]">
      {/* Header */}
      <div className="flex flex-col items-center gap-3 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold">
          Top Doctors to Book
        </h1>
        <p className="max-w-lg text-sm text-gray-600">
          Simply browse through our extensive list of trusted and verified
          doctors.
        </p>
      </div>

      {/* Doctors Grid */}
      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {doctors.slice(0, 10).map((item) => (
          <div
            key={item._id}
            onClick={() => {
              navigate(`/appointment/${item._id}`)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="group cursor-pointer rounded-2xl border border-blue-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            {/* Image */}
            <div className="relative overflow-hidden rounded-t-2xl bg-blue-50">
              <img
                src={item.image}
                alt={item.name}
                className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Availability Badge */}
              <span
                className={`absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-medium text-white ${
                  item.available ? 'bg-green-500' : 'bg-gray-500'
                }`}
              >
                {item.available ? 'Available' : 'Unavailable'}
              </span>
            </div>

            {/* Content */}
            <div className="p-4 space-y-1">
              <h3 className="text-lg font-medium text-gray-800 truncate">
                {item.name}
              </h3>

              <p className="text-sm text-gray-500 truncate">
                {item.speciality}
              </p>

              {/* Meta */}
              <div className="flex items-center justify-between pt-2 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  ⭐ {item.rating || '4.8'}
                </span>
                {item.experience && (
                  <span>{item.experience}+ yrs</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-14 flex justify-center">
        <button
          onClick={() => {
            navigate('/doctors')
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="rounded-full bg-primary px-12 py-3 text-sm font-medium text-white shadow-md transition hover:scale-105 hover:shadow-lg"
        >
          View All Doctors
        </button>
      </div>
    </section>
  )
}

export default TopDoctors
