import React, { useContext } from 'react'
import { DoctorContext } from './context/DoctorContext'
import { AdminContext } from './context/AdminContext'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Admin/Dashboard'
import AllAppointments from './pages/Admin/AllAppointments'
import AddDoctor from './pages/Admin/AddDoctor'
import DoctorsList from './pages/Admin/DoctorsList'
import Login from './pages/Login'
import DoctorAppointments from './pages/Doctor/DoctorAppointments'
import DoctorDashboard from './pages/Doctor/DoctorDashboard'
import DoctorProfile from './pages/Doctor/DoctorProfile'

const App = () => {
  const { dToken } = useContext(DoctorContext)
  const { aToken } = useContext(AdminContext)

  const isAuthenticated = dToken || aToken

  return (
    <>
      <ToastContainer position="top-right" />

      {isAuthenticated ? (
        <div className="min-h-screen bg-[#F8F9FD] flex flex-col">
          {/* Top Navbar */}
          <Navbar />

          {/* Main Layout */}
          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <aside className="hidden md:block">
              <Sidebar />
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto px-4 md:px-6 py-6">
              <Routes>
                {/* Admin Routes */}
                <Route path="/admin-dashboard" element={<Dashboard />} />
                <Route path="/all-appointments" element={<AllAppointments />} />
                <Route path="/add-doctor" element={<AddDoctor />} />
                <Route path="/doctor-list" element={<DoctorsList />} />

                {/* Doctor Routes */}
                <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
                <Route path="/doctor-appointments" element={<DoctorAppointments />} />
                <Route path="/doctor-profile" element={<DoctorProfile />} />

                {/* Fallback */}
                <Route path="*" element={<Dashboard />} />
              </Routes>
            </main>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  )
}

export default App
