import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { LoginSuccessToast, RegisterSuccessToast } from '../components/AuthToast'

export default function Home() {
  return (
    <div className='min-h-screen flex flex-col'>
      <nav className='fixed bg-custLightNavy w-full shadow-md 
        2xl:px-96 lg:px-24 md:px-10 px-4 h-12 z-50'>
        <Navbar />
      </nav>
      <main className='bg-custDarkNavy flex-1
      2xl:px-96
      lg:px-24 
      md:px-10 
      px-4 pt-16 py-4'>
        <LoginSuccessToast />
        <RegisterSuccessToast />
        <Outlet />
      </main>
      <footer className='mt-auto 2xl:px-96 lg:px-24 md:px-10 px-12 py-4 shadow-md bg-custLightNavy text-custWhite'>
        <Footer />
      </footer>
    </div>
  )
}
