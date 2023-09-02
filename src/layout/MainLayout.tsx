import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className='min-h-screen flex flex-col overflow-auto'>
      <nav className='fixed bg-white w-full shadow-md px-96 py-4 z-50'> 
        <Navbar />
      </nav>
      <main className='min-h-screen flex flex-col px-96 py-16'>
        <Outlet />
      </main>
      <footer className='px-96 py-4 shadow-md'> 
        <Footer />
      </footer>
    </div>
  )
}
