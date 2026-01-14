import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
  const navigate = useNavigate()

  return (
    <section className="relative my-20 md:mx-10">
      {/* Background Glow */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 blur opacity-20"></div>

      <div className="relative flex overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-blue-700 px-6 sm:px-10 md:px-14 lg:px-16 shadow-xl">

        {/* ---------- Left Content ---------- */}
        <div className="flex-1 py-10 sm:py-14 md:py-20 lg:py-24 lg:pl-5 text-white">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Book Appointment <br />
            <span className="text-blue-200">With 100+ Trusted Doctors</span>
          </h1>

          <p className="mt-4 max-w-md text-sm sm:text-base text-blue-100">
            Consult top specialists, book appointments instantly, and manage
            your healthcare seamlessly.
          </p>

          {/* Trust Stats */}
          <div className="mt-6 flex flex-wrap gap-6 text-sm text-blue-100">
            <div>
              <p className="text-lg font-semibold text-white">4.9★</p>
              <p>Patient Rating</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-white">10k+</p>
              <p>Happy Patients</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-white">100+</p>
              <p>Verified Doctors</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => {
                navigate('/login')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="rounded-full bg-white px-8 py-3 text-sm sm:text-base font-medium text-gray-700 shadow-md transition-all hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
            >
              Create Account
            </button>

            <button
              onClick={() => {
                navigate('/doctors')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="rounded-full border border-white/40 px-8 py-3 text-sm sm:text-base font-medium text-white transition-all hover:bg-white hover:text-gray-700"
            >
              Explore Doctors
            </button>
          </div>
        </div>

        {/* ---------- Right Image ---------- */}
        <div className="hidden md:flex md:w-1/2 lg:w-[420px] items-end justify-end relative">
          <img
            src={assets.appointment_img}
            alt="Doctor appointment"
            className="w-full max-w-md animate-float drop-shadow-2xl"
          />
        </div>
      </div>

      {/* Floating animation */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
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

export default Banner
