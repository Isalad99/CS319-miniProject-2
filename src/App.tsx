// src/App.tsx
import { Outlet, NavLink } from 'react-router'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      <Navbar />
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-40 bg-accent shrink-0 flex flex-col pt-2">
          <NavLink
            to="/"
            end
            id="sidebar-home"
            className={({ isActive }) =>
              `px-6 py-3 text-sm font-semibold transition-colors ${
                isActive
                  ? 'bg-accent-content/15 text-neutral font-bold'
                  : 'text-neutral/80 hover:bg-accent-content/10'
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/watchlist"
            id="sidebar-watchlist"
            className={({ isActive }) =>
              `px-6 py-3 text-sm font-semibold transition-colors ${
                isActive
                  ? 'bg-accent-content/15 text-neutral font-bold'
                  : 'text-neutral/80 hover:bg-accent-content/10'
              }`
            }
          >
            Watch lists
          </NavLink>
          <NavLink
            to="/my-ratings"
            id="sidebar-myreview"
            className={({ isActive }) =>
              `px-6 py-3 text-sm font-semibold transition-colors ${
                isActive
                  ? 'bg-accent-content/15 text-neutral font-bold'
                  : 'text-neutral/80 hover:bg-accent-content/10'
              }`
            }
          >
            My review
          </NavLink>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  )
}
