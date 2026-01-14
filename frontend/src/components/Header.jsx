import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <section className="md:mx-10 mt-6">
      <div className="relative flex flex-col md:flex-row items-center overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-blue-700 px-6 md:px-12 lg:px-20">

        {/* -------- Left Content -------- */}
        <div className="md:w-1/2 flex flex-col gap-6 py-14 md:py-28 text-white">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Book Appointment <br />
            <span className="text-blue-200">With Trusted Doctors</span>
          </h1>

          <div className="flex items-center gap-4 text-sm text-blue-100">
            <img
              className="w-28"
              src={assets.group_profiles}
              alt="Trusted doctors"
            />
            <p className="max-w-md leading-relaxed">
              Simply browse through our extensive list of trusted doctors and
              schedule your appointment hassle-free.
            </p>
          </div>

          {/* CTA */}
          <a
            href="#speciality"
            className="group mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-medium text-gray-700 shadow-md transition-all hover:scale-105 hover:shadow-lg"
          >
            Book Appointment
            <img
              className="w-3 transition-transform group-hover:translate-x-1"
              src={assets.arrow_icon}
              alt=""
            />
          </a>
        </div>

        {/* -------- Right Image -------- */}
        <div className="md:w-1/2 relative flex justify-center md:justify-end">
          <img
            src={assets.header_img}
            alt="Doctor consultation"
            className="w-full max-w-lg animate-float"
          />
        </div>

        {/* Decorative Glow */}
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
      </div>

      {/* Animation */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
        `}
      </style>
    </section>
  )
}

export default Header
