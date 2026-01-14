import React, { useContext, useEffect, useRef, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const navigate = useNavigate()
  const { token, setToken, userData } = useContext(AppContext)

  const [showMenu, setShowMenu] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  const menuRef = useRef(null)
  const dropdownRef = useRef(null)

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutsideMenu = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutsideMenu)
    return () => document.removeEventListener('mousedown', handleClickOutsideMenu)
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutsideDropdown = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutsideDropdown)
    return () => document.removeEventListener('mousedown', handleClickOutsideDropdown)
  }, [])

  const navLinkClass = ({ isActive }) =>
    `relative py-1 transition ${
      isActive ? 'text-primary' : 'text-gray-600 hover:text-primary'
    } after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-primary after:scale-x-0 after:origin-left after:transition ${
      isActive ? 'after:scale-x-100' : 'hover:after:scale-x-100'
    }`

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b">
      <div className="flex items-center justify-between px-4 md:px-10 py-4 text-sm">

        {/* Logo */}
        <img
          onClick={() => navigate('/')}
          className="w-28 cursor-pointer"
          src={assets.logo2}
          alt="CareCloud"
        />

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-6 font-medium">
          <NavLink to="/" className={navLinkClass}>HOME</NavLink>
          <NavLink to="/doctors" className={navLinkClass}>ALL DOCTORS</NavLink>
          <NavLink to="/about" className={navLinkClass}>ABOUT</NavLink>
          <NavLink to="/contact" className={navLinkClass}>CONTACT</NavLink>
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-4">

          {token && userData ? (
            <div ref={dropdownRef} className="relative">

              {/* Avatar */}
              <div
                onClick={() => setShowDropdown((prev) => !prev)}
                className="flex items-center gap-2 cursor-pointer select-none"
              >
                <img
                  className="w-9 h-9 rounded-full border border-primary object-cover"
                  src={userData.image || assets.profile_placeholder}
                  alt="User"
                />
                <img className="w-3" src={assets.dropdown_icon} alt="" />
              </div>

              {/* Dropdown */}
              <div
                className={`absolute right-0 mt-4 z-[60] ${
                  showDropdown ? 'block' : 'hidden'
                }`}
              >
                <div className="min-w-48 rounded-xl bg-white shadow-2xl border border-gray-200 p-4 text-gray-700">
                  <p
                    onClick={() => {
                      setShowDropdown(false)
                      navigate('/my-profile')
                    }}
                    className="dropdown-item"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => {
                      setShowDropdown(false)
                      navigate('/my-appointments')
                    }}
                    className="dropdown-item"
                  >
                    My Appointments
                  </p>
                  <hr className="my-2" />
                  <p
                    onClick={logout}
                    className="dropdown-item text-red-500"
                  >
                    Logout
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="hidden md:block rounded-full bg-primary px-8 py-2.5 text-white transition hover:opacity-90"
            >
              Create account
            </button>
          )}

          {/* Mobile Menu Icon */}
          <img
            onClick={() => setShowMenu(true)}
            className="w-6 cursor-pointer md:hidden"
            src={assets.menu_icon}
            alt="Menu"
          />
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition ${
          showMenu ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div
          ref={menuRef}
          className={`absolute right-0 top-0 h-full w-72 bg-white p-6 transition-transform ${
            showMenu ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between mb-8">
            <img src={assets.logo2} className="w-32" alt="" />
            <img
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              className="w-6 cursor-pointer"
              alt="Close"
            />
          </div>

          <ul className="flex flex-col gap-4 text-lg font-medium">
            <NavLink onClick={() => setShowMenu(false)} to="/">HOME</NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/doctors">ALL DOCTORS</NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/about">ABOUT</NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/contact">CONTACT</NavLink>
          </ul>

          {!token && (
            <button
              onClick={() => {
                setShowMenu(false)
                navigate('/login')
              }}
              className="mt-8 w-full rounded-full bg-primary py-3 text-white"
            >
              Create Account
            </button>
          )}
        </div>
      </div>

      {/* Styles */}
      <style>
        {`
          .dropdown-item {
            padding: 0.6rem 0;
            cursor: pointer;
            font-size: 0.95rem;
            color: #374151;
          }
          .dropdown-item:hover {
            color: #000;
          }
        `}
      </style>
    </header>
  )
}

export default Navbar
