import axios from 'axios'
import React, { useContext, useState } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()

  const [role, setRole] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const { setDToken } = useContext(DoctorContext)
  const { setAToken } = useContext(AdminContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      if (role === 'Admin') {
        const { data } = await axios.post(
          backendUrl + '/api/admin/login',
          { email, password }
        )

        if (data.success) {
          setAToken(data.token)
          localStorage.setItem('aToken', data.token)
          navigate('/admin-dashboard')
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(
          backendUrl + '/api/doctor/login',
          { email, password }
        )

        if (data.success) {
          setDToken(data.token)
          localStorage.setItem('dToken', data.token)
          navigate('/doctor-dashboard')
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg border p-8 space-y-6"
      >
        {/* Title */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            <span className="text-primary">{role}</span> Login
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Enter your credentials to continue
          </p>
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            className="w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full rounded-lg bg-primary py-2.5 text-white font-medium hover:opacity-90 transition"
        >
          Login
        </button>

        {/* Switch Role */}
        <p className="text-center text-sm text-gray-600">
          {role === 'Admin' ? (
            <>
              Doctor Login?{' '}
              <span
                onClick={() => setRole('Doctor')}
                className="text-primary cursor-pointer font-medium hover:underline"
              >
                Click here
              </span>
            </>
          ) : (
            <>
              Admin Login?{' '}
              <span
                onClick={() => setRole('Admin')}
                className="text-primary cursor-pointer font-medium hover:underline"
              >
                Click here
              </span>
            </>
          )}
        </p>
      </form>
    </main>
  )
}

export default Login
