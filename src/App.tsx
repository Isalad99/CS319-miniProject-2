// src/App.tsx
import { Outlet, NavLink } from 'react-router'
import Navbar from './components/Navbar'
import Footer from './components/Footer'


const linkClass = ({ isActive }: { isActive: boolean }) =>
  `px-4 md:px-6 py-3 text-sm whitespace-nowrap font-semibold transition-colors ${
    isActive
      ? 'bg-accent-content/15 text-neutral font-bold'
      : 'text-neutral/80 hover:bg-accent-content/10'
  }`

export default function App() {
  return (
    <div className="h-screen flex flex-col bg-base-100 overflow-hidden">
      {/* Navbar */}
      <div className="shrink-0">
        <Navbar />
      </div>

      <div className="flex flex-1 min-h-0 flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="md:w-40 bg-accent shrink-0 flex flex-row md:flex-col md:pt-2 overflow-x-auto md:overflow-y-auto">
          <NavLink to="/" end id="sidebar-home" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/watchlist" id="sidebar-watchlist" className={linkClass}>
            Watch lists
          </NavLink>
          <NavLink to="/my-ratings" id="sidebar-myreview" className={linkClass}>
            My review
          </NavLink>
        </aside>

        {/* Main + Footer */}
        <div className="flex-1 min-w-0 min-h-0 overflow-y-auto flex flex-col">
          <main className="flex-1 p-4 sm:p-6">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  )
}