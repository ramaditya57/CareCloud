import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <main className="px-4 md:px-10">

      {/* ---------- Heading ---------- */}
      <section className="text-center pt-12">
        <h1 className="text-3xl font-semibold text-gray-700">
          ABOUT <span className="text-primary">US</span>
        </h1>
        <p className="mt-2 text-sm text-gray-500 max-w-xl mx-auto">
          Learn more about CareCloud and our mission to simplify healthcare.
        </p>
      </section>

      {/* ---------- About Content ---------- */}
      <section className="my-14 flex flex-col md:flex-row gap-12 items-center">
        <img
          className="w-full max-w-md rounded-2xl shadow-md"
          src={assets.about_image}
          alt="About CareCloud"
        />

        <div className="flex flex-col gap-6 md:w-2/4 text-sm text-gray-600 leading-relaxed">
          <p>
            Welcome to <span className="font-medium text-gray-800">CareCloud</span>,
            your trusted partner in managing your healthcare needs conveniently
            and efficiently. We understand the challenges individuals face when
            scheduling doctor appointments and managing health records.
          </p>

          <p>
            CareCloud is committed to excellence in healthcare technology.
            We continuously enhance our platform by integrating the latest
            advancements to improve user experience and deliver superior service.
            Whether you're booking your first appointment or managing ongoing care,
            we support you every step of the way.
          </p>

          <div>
            <h3 className="text-base font-semibold text-gray-800 mb-1">
              Our Vision
            </h3>
            <p>
              To create a seamless healthcare experience for every user by
              bridging the gap between patients and healthcare providers —
              making quality care accessible, timely, and effortless.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- Why Choose Us ---------- */}
      <section className="my-16">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-10">
          WHY <span className="text-primary">CHOOSE US</span>
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Card 1 */}
          <div className="group rounded-2xl border bg-white px-8 py-10 text-gray-600 shadow-sm transition-all duration-300 hover:bg-primary hover:text-white hover:-translate-y-2 hover:shadow-xl">
            <h3 className="font-semibold mb-3 tracking-wide">
              EFFICIENCY
            </h3>
            <p className="text-sm leading-relaxed">
              Streamlined appointment scheduling designed to fit perfectly into
              your busy lifestyle.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group rounded-2xl border bg-white px-8 py-10 text-gray-600 shadow-sm transition-all duration-300 hover:bg-primary hover:text-white hover:-translate-y-2 hover:shadow-xl">
            <h3 className="font-semibold mb-3 tracking-wide">
              CONVENIENCE
            </h3>
            <p className="text-sm leading-relaxed">
              Easy access to a wide network of trusted and verified healthcare
              professionals near you.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group rounded-2xl border bg-white px-8 py-10 text-gray-600 shadow-sm transition-all duration-300 hover:bg-primary hover:text-white hover:-translate-y-2 hover:shadow-xl">
            <h3 className="font-semibold mb-3 tracking-wide">
              PERSONALIZATION
            </h3>
            <p className="text-sm leading-relaxed">
              Tailored doctor recommendations, reminders, and health insights
              to help you stay proactive.
            </p>
          </div>
        </div>
      </section>

    </main>
  )
}

export default About
