import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <section
      id="speciality"
      className="flex flex-col items-center gap-4 py-20 px-4 text-[#262626]"
    >
      {/* Header */}
      <h1 className="text-3xl md:text-4xl font-semibold">
        Find by Speciality
      </h1>
      <p className="max-w-lg text-center text-sm text-gray-600">
        Simply browse through our extensive list of trusted doctors and
        schedule your appointment hassle-free.
      </p>

      {/* Speciality Scroll */}
      <div className="mt-10 w-full overflow-x-auto">
        <div className="flex gap-6 sm:justify-center snap-x snap-mandatory px-1 scrollbar-hide">
          {specialityData.map((item, index) => (
            <Link
              key={index}
              to={`/doctors/${item.speciality}`}
              onClick={() =>
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }
              className="group snap-start flex w-28 sm:w-36 flex-shrink-0 flex-col items-center rounded-2xl bg-white p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-3 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-blue-50">
                <img
                  src={item.image}
                  alt={item.speciality}
                  className="h-10 sm:h-12 transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <p className="text-sm font-medium text-gray-700">
                {item.speciality}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SpecialityMenu
