import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'

const Home = () => {
  return (
    <main className="w-full overflow-x-hidden">

      {/* Hero / Header */}
      <Header />

      {/* Speciality Section */}
      <section className="bg-white">
        <SpecialityMenu />
      </section>

      {/* Divider */}
      <div className="mx-auto my-10 h-px w-11/12 bg-gray-200 md:w-3/4" />

      {/* Top Doctors */}
      <section className="bg-gray-50">
        <TopDoctors />
      </section>

      {/* CTA Banner */}
      <section className="bg-white">
        <Banner />
      </section>

    </main>
  )
}

export default Home
