import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData } =
    useContext(DoctorContext)

  const { currency, backendUrl } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        about: profileData.about,
        available: profileData.available,
      }

      const { data } = await axios.post(
        backendUrl + '/api/doctor/update-profile',
        updateData,
        { headers: { dToken } }
      )

      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
  }, [dToken])

  if (!profileData) return null

  return (
    <main className="px-4 md:px-6 py-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">

        {/* ---------- Profile Image ---------- */}
        <div className="bg-white rounded-2xl border shadow-sm p-4 h-fit">
          <img
            src={profileData.image}
            alt="Doctor"
            className="w-full rounded-xl object-cover bg-primary/80"
          />
        </div>

        {/* ---------- Profile Details ---------- */}
        <div className="bg-white rounded-2xl border shadow-sm p-6 space-y-5">

          {/* Header */}
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              {profileData.name}
            </h1>
            <p className="text-gray-600">
              {profileData.degree} • {profileData.speciality}
            </p>
            <span className="inline-block mt-2 rounded-full border px-3 py-1 text-xs text-gray-600">
              {profileData.experience}
            </span>
          </div>

          {/* About */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">
              About
            </p>
            {isEdit ? (
              <textarea
                rows={6}
                value={profileData.about}
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    about: e.target.value,
                  }))
                }
                className="w-full rounded-lg border px-3 py-2 outline-primary text-sm"
              />
            ) : (
              <p className="text-sm text-gray-600 leading-relaxed">
                {profileData.about}
              </p>
            )}
          </div>

          {/* Fees */}
          <div className="flex items-center gap-2 text-sm">
            <p className="font-medium text-gray-700">
              Appointment Fee:
            </p>
            {isEdit ? (
              <input
                type="number"
                value={profileData.fees}
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    fees: e.target.value,
                  }))
                }
                className="w-24 rounded border px-2 py-1"
              />
            ) : (
              <span className="text-gray-800">
                {currency} {profileData.fees}
              </span>
            )}
          </div>

          {/* Address */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">
              Address
            </p>
            {isEdit ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={profileData.address.line1}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        line1: e.target.value,
                      },
                    }))
                  }
                  className="w-full rounded border px-3 py-2 text-sm"
                  placeholder="Address line 1"
                />
                <input
                  type="text"
                  value={profileData.address.line2}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        line2: e.target.value,
                      },
                    }))
                  }
                  className="w-full rounded border px-3 py-2 text-sm"
                  placeholder="Address line 2"
                />
              </div>
            ) : (
              <p className="text-sm text-gray-600">
                {profileData.address.line1}
                <br />
                {profileData.address.line2}
              </p>
            )}
          </div>

          {/* Availability */}
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700">
              Availability
            </label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={profileData.available}
                onChange={() =>
                  isEdit &&
                  setProfileData((prev) => ({
                    ...prev,
                    available: !prev.available,
                  }))
                }
              />
              <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-primary transition"></div>
              <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-5"></div>
            </label>
            <span className="text-sm text-gray-600">
              {profileData.available ? 'Available' : 'Unavailable'}
            </span>
          </div>

          {/* Actions */}
          <div className="pt-4">
            {isEdit ? (
              <button
                onClick={updateProfile}
                className="rounded-full border border-primary px-6 py-2 text-sm text-primary hover:bg-primary hover:text-white transition"
              >
                Save Changes
              </button>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="rounded-full border border-primary px-6 py-2 text-sm text-primary hover:bg-primary hover:text-white transition"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default DoctorProfile
