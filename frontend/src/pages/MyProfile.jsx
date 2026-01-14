import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyProfile = () => {
  const { token, backendUrl, userData, setUserData, loadUserProfileData } =
    useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)

  /* ---------------- Update Profile ---------------- */
  const updateUserProfileData = async () => {
    try {
      setLoading(true)

      const formData = new FormData()
      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)

      if (image) formData.append('image', image)

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formData,
        { headers: { token } }
      )

      if (data.success) {
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(null)
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!userData) return null

  return (
    <main className="px-4 md:px-10 py-10 flex justify-center">
      <div className="w-full max-w-2xl rounded-2xl border bg-white p-8 shadow-sm">

        {/* ---------- Profile Header ---------- */}
        <div className="flex flex-col items-center gap-4">
          {isEdit ? (
            <label htmlFor="image" className="relative cursor-pointer">
              <img
                src={image ? URL.createObjectURL(image) : userData.image}
                alt="Profile"
                className="h-36 w-36 rounded-full object-cover opacity-80"
              />
              {!image && (
                <img
                  src={assets.upload_icon}
                  alt="Upload"
                  className="absolute bottom-2 right-2 w-8"
                />
              )}
              <input
                type="file"
                id="image"
                hidden
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>
          ) : (
            <img
              src={userData.image}
              alt="Profile"
              className="h-36 w-36 rounded-full object-cover"
            />
          )}

          {isEdit ? (
            <input
              type="text"
              value={userData.name}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="text-center text-2xl font-semibold bg-gray-50 rounded-lg px-3 py-1"
            />
          ) : (
            <h1 className="text-2xl font-semibold text-gray-800">
              {userData.name}
            </h1>
          )}
        </div>

        <hr className="my-8" />

        {/* ---------- Contact Information ---------- */}
        <section>
          <h3 className="text-sm font-semibold text-gray-600 uppercase mb-4">
            Contact Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-gray-700">Email</p>
              <p className="text-blue-500">{userData.email}</p>
            </div>

            <div>
              <p className="font-medium text-gray-700">Phone</p>
              {isEdit ? (
                <input
                  type="text"
                  value={userData.phone}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                  className="mt-1 w-full rounded-lg border px-3 py-2"
                />
              ) : (
                <p className="text-gray-500">{userData.phone}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <p className="font-medium text-gray-700">Address</p>
              {isEdit ? (
                <div className="space-y-2 mt-1">
                  <input
                    type="text"
                    value={userData.address.line1}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                    className="w-full rounded-lg border px-3 py-2"
                    placeholder="Address line 1"
                  />
                  <input
                    type="text"
                    value={userData.address.line2}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                    className="w-full rounded-lg border px-3 py-2"
                    placeholder="Address line 2"
                  />
                </div>
              ) : (
                <p className="text-gray-500">
                  {userData.address.line1}
                  <br />
                  {userData.address.line2}
                </p>
              )}
            </div>
          </div>
        </section>

        <hr className="my-8" />

        {/* ---------- Basic Information ---------- */}
        <section>
          <h3 className="text-sm font-semibold text-gray-600 uppercase mb-4">
            Basic Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-gray-700">Gender</p>
              {isEdit ? (
                <select
                  value={userData.gender}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      gender: e.target.value,
                    }))
                  }
                  className="mt-1 w-full rounded-lg border px-3 py-2"
                >
                  <option value="Not Selected">Not Selected</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <p className="text-gray-500">{userData.gender}</p>
              )}
            </div>

            <div>
              <p className="font-medium text-gray-700">Date of Birth</p>
              {isEdit ? (
                <input
                  type="date"
                  value={userData.dob}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, dob: e.target.value }))
                  }
                  className="mt-1 w-full rounded-lg border px-3 py-2"
                />
              ) : (
                <p className="text-gray-500">{userData.dob}</p>
              )}
            </div>
          </div>
        </section>

        {/* ---------- Actions ---------- */}
        <div className="mt-10 flex justify-end">
          {isEdit ? (
            <button
              onClick={updateUserProfileData}
              disabled={loading}
              className={`rounded-full px-8 py-3 text-sm font-medium transition ${
                loading
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'border border-primary text-primary hover:bg-primary hover:text-white'
              }`}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="rounded-full border border-primary px-8 py-3 text-sm font-medium text-primary hover:bg-primary hover:text-white transition"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </main>
  )
}

export default MyProfile
