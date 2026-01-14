import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <main className="px-4 md:px-10">

      {/* ---------- Heading ---------- */}
      <section className="text-center pt-12">
        <h1 className="text-3xl font-semibold text-gray-700">
          CONTACT <span className="text-primary">US</span>
        </h1>
        <p className="mt-2 text-sm text-gray-500 max-w-xl mx-auto">
          We’d love to hear from you. Reach out to us for any queries or support.
        </p>
      </section>

      {/* ---------- Content ---------- */}
      <section className="my-16 flex flex-col md:flex-row items-center gap-12 mb-28">

        {/* Image */}
        <img
          className="w-full max-w-md rounded-2xl shadow-md"
          src={assets.contact_image}
          alt="Contact CareCloud"
        />

        {/* Info Card */}
        <div className="w-full md:max-w-lg rounded-2xl border bg-white p-8 shadow-sm flex flex-col gap-6">

          {/* Office */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">
              Our Office
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              New Lane, Opp PM Aawas <br />
              Delhi, India
            </p>
          </div>

          {/* Contact */}
          <div>
            <p className="text-sm text-gray-500">
              <span className="font-medium text-gray-700">Phone:</span> +91 8770210618
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-medium text-gray-700">Email:</span> carefree@carecloud.com
            </p>
          </div>

          <hr />

          {/* Careers */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">
              Careers at CareCloud
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Learn more about our teams and current job openings.
            </p>

            <button className="w-fit rounded-full border border-primary px-8 py-3 text-sm font-medium text-primary transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-lg">
              Explore Jobs
            </button>
          </div>

        </div>
      </section>

    </main>
  )
}

export default Contact
