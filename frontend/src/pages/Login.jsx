import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [state, setState] = useState('Sign Up')
  const [loading, setLoading] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const { backendUrl, token, setToken } = useContext(AppContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if (loading) return

    try {
      setLoading(true)

      if (state === 'Sign Up') {
        const { data } = await axios.post(
          `${backendUrl}/api/user/register`,
          { name, email, password }
        )

        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success('Account created successfully')
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(
          `${backendUrl}/api/user/login`,
          { email, password }
        )

        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success('Login successful')
        } else {
          toast.error(data.message)
        }
      }
    } catch (err) {
      toast.error(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token, navigate])

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-lg"
      >
        {/* Heading */}
        <h1 className="text-2xl font-semibold text-gray-800">
          {state === 'Sign Up' ? 'Create Account' : 'Welcome Back'}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          {state === 'Sign Up'
            ? 'Sign up to book appointments easily'
            : 'Login to manage your appointments'}
        </p>

        {/* Name */}
        {state === 'Sign Up' && (
          <div className="mt-6">
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary"
              placeholder="John Doe"
            />
          </div>
        )}

        {/* Email */}
        <div className="mt-4">
          <label className="text-sm text-gray-600">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary"
            placeholder="john@example.com"
          />
        </div>

        {/* Password */}
        <div className="mt-4">
          <label className="text-sm text-gray-600">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary"
            placeholder="••••••••"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className={`mt-6 w-full rounded-full py-3 text-sm font-medium text-white transition ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-primary hover:scale-[1.02]'
          }`}
        >
          {loading
            ? 'Please wait...'
            : state === 'Sign Up'
            ? 'Create Account'
            : 'Login'}
        </button>

        {/* Toggle */}
        <p className="mt-6 text-center text-sm text-gray-600">
          {state === 'Sign Up' ? (
            <>
              Already have an account?{' '}
              <span
                onClick={() => setState('Login')}
                className="cursor-pointer text-primary font-medium"
              >
                Login here
              </span>
            </>
          ) : (
            <>
              New to CareCloud?{' '}
              <span
                onClick={() => setState('Sign Up')}
                className="cursor-pointer text-primary font-medium"
              >
                Create an account
              </span>
            </>
          )}
        </p>
      </form>
    </main>
  )
}

export default Login
