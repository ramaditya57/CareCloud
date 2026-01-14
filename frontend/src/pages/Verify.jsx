import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'

const Verify = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const success = searchParams.get('success')
  const appointmentId = searchParams.get('appointmentId')

  const { backendUrl, token } = useContext(AppContext)

  const [loading, setLoading] = useState(true)

  /* ---------------- Verify Stripe Payment ---------------- */
  const verifyStripe = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/verifyStripe`,
        { success, appointmentId },
        { headers: { token } }
      )

      if (data.success) {
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message || 'Payment verification failed')
    } finally {
      setTimeout(() => {
        navigate('/my-appointments')
      }, 1500)
    }
  }

  useEffect(() => {
    if (token && appointmentId && success) {
      verifyStripe()
    } else {
      toast.error('Invalid payment verification request')
      navigate('/')
    }
  }, [token, appointmentId, success])

  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      {loading && (
        <>
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-300 border-t-primary"></div>
          <p className="text-sm text-gray-600">
            Verifying your payment, please wait...
          </p>
        </>
      )}
    </main>
  )
}

export default Verify
