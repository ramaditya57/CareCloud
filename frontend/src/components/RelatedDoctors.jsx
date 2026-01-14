import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const RelatedDoctors = ({ speciality, docId }) => {
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  const [relDoc, setRelDoc] = useState([])

  useEffect(() => {
    if (doctors.length && speciality) {
      const filtered = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      )
      setRelDoc(filtered)
    }
  }, [doctors, speciality, docId])

  if (!relDoc.length) return null

  return (
    <section className="my-20 px-4 md:px-0">
      {/* Header */}
      <div className="flex flex-col items-center gap-3 text-center">
        <h2 className="text-3xl font-semibold text-gray-800">
          Related Doctors
        </h2>
        <p className="max-w-lg text-sm text-gray-600">
          Browse other trusted doctors from the same speciality.
        </p>
      </div>

      {/* Grid */}
      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {relDoc.map((item) => (
          <div
            key={item._id}
            onClick={() => {
              navigate(`/appointment/${item._id}`)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="group cursor-pointer rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            {/* Image */}
            <div className="relative overflow-hidden rounded-t-2xl bg-blue-50">
              <img
                src={item.image}
                alt={item.name}
                className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Availability */}
              <span
                className={`absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-medium text-white ${
                  item.available ? 'bg-green-500' : 'bg-gray-500'
                }`}
              >
                {item.available ? 'Available' : 'Unavailable'}
              </span>
            </div>

            {/* Info */}
            <div className="p-4 space-y-1">
              <h3 className="text-lg font-medium text-gray-800 truncate">
                {item.name}
              </h3>
              <p className="text-sm text-gray-500 truncate">
                {item.speciality}
              </p>

              <div className="flex items-center justify-between pt-2 text-xs text-gray-500">
                <span>⭐ {item.rating || '4.8'}</span>
                {item.experience && <span>{item.experience}+ yrs</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default RelatedDoctors
