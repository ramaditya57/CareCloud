import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'

const Sidebar = () => {
  const { dToken } = useContext(DoctorContext)
  const { aToken } = useContext(AdminContext)

  const adminLinks = [
    {
      to: '/admin-dashboard',
      label: 'Dashboard',
      icon: assets.home_icon,
    },
    {
      to: '/all-appointments',
      label: 'Appointments',
      icon: assets.appointment_icon,
    },
    {
      to: '/add-doctor',
      label: 'Add Doctor',
      icon: assets.add_icon,
    },
    {
      to: '/doctor-list',
      label: 'Doctors List',
      icon: assets.people_icon,
    },
  ]

  const doctorLinks = [
    {
      to: '/doctor-dashboard',
      label: 'Dashboard',
      icon: assets.home_icon,
    },
    {
      to: '/doctor-appointments',
      label: 'Appointments',
      icon: assets.appointment_icon,
    },
    {
      to: '/doctor-profile',
      label: 'Profile',
      icon: assets.people_icon,
    },
  ]

  const links = aToken ? adminLinks : dToken ? doctorLinks : []

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 md:px-9 py-3.5 cursor-pointer transition-all
     ${
       isActive
         ? 'bg-blue-50 border-r-4 border-primary text-primary'
         : 'text-gray-600 hover:bg-gray-100'
     }`

  return (
    <aside className="min-h-screen w-16 md:w-72 bg-white border-r">
      <ul className="mt-6 space-y-1">
        {links.map((item) => (
          <NavLink key={item.to} to={item.to} className={linkClass}>
            <img src={item.icon} alt="" className="w-5 min-w-5" />
            <span className="hidden md:block text-sm font-medium">
              {item.label}
            </span>
          </NavLink>
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar
