import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { dToken, setDToken } = useContext(DoctorContext)
  const { aToken, setAToken } = useContext(AdminContext)

  const navigate = useNavigate()

  const role = aToken ? 'Admin' : 'Doctor'

  const logout = () => {
    if (dToken) {
      setDToken('')
      localStorage.removeItem('dToken')
    }

    if (aToken) {
      setAToken('')
      localStorage.removeItem('aToken')
    }

    navigate('/')
  }

  return (
    <header className="sticky top-0 z-30 bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 sm:px-10 py-3">

        {/* Left */}
        <div className="flex items-center gap-3">
          <img
            src={assets.logo2}
            alt="CareCloud"
            onClick={() => navigate('/')}
            className="w-28 cursor-pointer hover:opacity-90 transition"
          />

          <span
            className={`rounded-full px-3 py-1 text-xs font-medium border
              ${
                role === 'Admin'
                  ? 'border-red-500 text-red-600 bg-red-50'
                  : 'border-blue-500 text-blue-600 bg-blue-50'
              }`}
          >
            {role} Panel
          </span>
        </div>

        {/* Right */}
        <button
          onClick={logout}
          className="rounded-full bg-primary px-8 py-2 text-sm font-medium text-white transition hover:opacity-90"
        >
          Logout
        </button>
      </div>
    </header>
  )
}

export default Navbar
