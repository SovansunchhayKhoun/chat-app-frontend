import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { LoginSuccessToast, RegisterSuccessToast } from '../components/AuthToast'

export default function Home() {
  return (
    <div className='min-h-screen flex flex-col'>
      <nav className='fixed bg-custLightNavy w-full shadow-md 
        2xl:px-96 lg:px-24 md:px-10 px-12 h-12 z-50'>
        <Navbar />
      </nav>
      <main className='bg-custDarkNavy flex flex-col min-h-screen 2xl:px-96 lg:px-24 md:px-10 px-12 py-16'>
        <LoginSuccessToast/>
        <RegisterSuccessToast/>
        <Outlet />
      </main>
      <footer className='2xl:px-96 lg:px-24 md:px-10 px-12 py-4 shadow-md bg-custLightNavy text-custWhite'>
        <Footer />
      </footer>
    </div>
  )
}
