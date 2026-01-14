import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa'

const Footer = () => {
  const navigate = useNavigate()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-gray-50 mt-40 border-t">
      <div className="md:mx-10 px-6 py-16">

        {/* -------- Top Section -------- */}
        <div className="grid gap-14 sm:grid-cols-2 md:grid-cols-[3fr_1fr_1fr_2fr] text-sm">

          {/* Logo & About */}
          <div>
            <img className="mb-5 w-40" src={assets.logo2} alt="CareCloud logo" />
            <p className="text-gray-600 leading-6 max-w-sm">
              CareCloud is a trusted doctor booking and online consultation
              platform helping patients connect with verified healthcare
              professionals instantly.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map(
                (Icon, i) => (
                  <span
                    key={i}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow hover:bg-primary hover:text-white transition cursor-pointer"
                  >
                    <Icon size={14} />
                  </span>
                )
              )}
            </div>
          </div>

          {/* Company */}
          <div>
            <p className="text-lg font-semibold mb-5">Company</p>
            <ul className="flex flex-col gap-3 text-gray-600">
              <li onClick={() => navigate('/')} className="hover:text-primary cursor-pointer">Home</li>
              <li onClick={() => navigate('/about')} className="hover:text-primary cursor-pointer">About Us</li>
              <li onClick={() => navigate('/doctors')} className="hover:text-primary cursor-pointer">Doctors</li>
              <li onClick={() => navigate('/privacy')} className="hover:text-primary cursor-pointer">Privacy Policy</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <p className="text-lg font-semibold mb-5">Support</p>
            <ul className="flex flex-col gap-3 text-gray-600">
              <li className="hover:text-primary cursor-pointer">Help Center</li>
              <li className="hover:text-primary cursor-pointer">Terms & Conditions</li>
              <li className="hover:text-primary cursor-pointer">FAQs</li>
              <li className="hover:text-primary cursor-pointer">Contact Support</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <p className="text-lg font-semibold mb-5">Get in Touch</p>
            <ul className="flex flex-col gap-2 text-gray-600 mb-4">
              <li>📞 +91-8770210618</li>
              <li>✉️ consult@carecloud.com</li>
            </ul>

            <div className="mt-4">
              <p className="mb-2 font-medium text-gray-700">Subscribe to newsletter</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full rounded-l-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary"
                />
                <button className="rounded-r-md bg-primary px-4 text-white text-sm hover:opacity-90">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* -------- Bottom Bar -------- */}
        <div className="mt-14 border-t pt-6 text-center text-sm text-gray-500">
          © {year} <span className="font-medium text-gray-700">CareCloud</span>. All rights reserved.
        </div>

      </div>
    </footer>
  )
}

export default Footer
