import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'

const specialities = [
  'General physician',
  'Gynecologist',
  'Dermatologist',
  'Pediatricians',
  'Neurologist',
  'Gastroenterologist',
]

const Doctors = () => {
  const { speciality } = useParams()
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  const [filteredDocs, setFilteredDocs] = useState([])
  const [showFilter, setShowFilter] = useState(false)

  useEffect(() => {
    if (speciality) {
      setFilteredDocs(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilteredDocs(doctors)
    }
  }, [doctors, speciality])

  return (
    <main className="px-4 md:px-10 py-6">

      {/* Header */}
      <p className="text-gray-600 mb-6">
        Browse through our trusted doctors by speciality.
      </p>

      <div className="flex flex-col sm:flex-row gap-6">

        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setShowFilter(!showFilter)}
          className={`sm:hidden w-fit rounded-full px-4 py-2 text-sm border transition ${
            showFilter ? 'bg-primary text-white' : 'bg-white text-gray-600'
          }`}
        >
          Filters
        </button>

        {/* Filters */}
        <aside
          className={`flex flex-col gap-3 text-sm ${
            showFilter ? 'flex' : 'hidden sm:flex'
          } sm:w-56`}
        >
          {specialities.map((item) => {
            const active = speciality === item
            return (
              <button
                key={item}
                onClick={() =>
                  active ? navigate('/doctors') : navigate(`/doctors/${item}`)
                }
                className={`rounded-lg border px-4 py-2 text-left transition ${
                  active
                    ? 'bg-blue-100 text-gray-900 border-primary'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {item}
              </button>
            )
          })}
        </aside>

        {/* Doctors Grid */}
        <section className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {filteredDocs.length > 0 ? (
            filteredDocs.map((doc) => (
              <div
                key={doc._id}
                onClick={() => {
                  navigate(`/appointment/${doc._id}`)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="group cursor-pointer rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative overflow-hidden rounded-t-2xl bg-blue-50">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  <span
                    className={`absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-medium text-white ${
                      doc.available ? 'bg-green-500' : 'bg-gray-500'
                    }`}
                  >
                    {doc.available ? 'Available' : 'Unavailable'}
                  </span>
                </div>

                {/* Info */}
                <div className="p-4 space-y-1">
                  <h3 className="text-lg font-medium text-gray-800 truncate">
                    {doc.name}
                  </h3>
                  <p className="text-sm text-gray-500 truncate">
                    {doc.speciality}
                  </p>

                  <div className="flex items-center justify-between pt-2 text-xs text-gray-500">
                    <span>⭐ {doc.rating || '4.8'}</span>
                    {doc.experience && <span>{doc.experience}+ yrs</span>}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 mt-20">
              No doctors found for this speciality.
            </p>
          )}
        </section>

      </div>
    </main>
  )
}

export default Doctors
