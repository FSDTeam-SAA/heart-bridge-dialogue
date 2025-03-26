import { useState, useEffect } from "react"
import { Heart, Menu, X, Sparkles, User, LayoutDashboard, LogOut } from "lucide-react"
import { Link } from "react-router-dom"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setIsMenuOpen(false)
  }

  return (
    <>
      <nav className="w-full bg-white px-4 py-3 sticky top-0 z-40">
        <div className="container flex items-center justify-between">
          {/* Logo and brand name */}
          <Link to="/" className="flex items-center gap-2 text-xl font-semibold text-[#C62553]">
            <Heart className="h-5 w-5" />
            <span>HeartBridge</span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-7 md:flex">
            {isLoggedIn ? (
              <>
                <Link
                  href="/upgrade"
                  className="flex items-center gap-1 rounded-full border border-gray-200 px-4 py-1.5 text-[18px] font-medium text-[#C62553] hover:bg-[#C6255310]"
                >
                  <Sparkles className="h-4 w-4 text-[#C62553]" />
                  Upgrade
                </Link>
                <div className="relative">
                  <button
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-[#C6255310]"
                    onClick={handleLogout}
                    aria-label="User profile"
                  >
                    <User className="h-5 w-5 text-[#C62553]" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <button onClick={handleLogin} className="text-gray-700 hover:text-[#C62553] text-sm font-bold">
                  Log in
                </button>
                <Link to="/signup" className="rounded-full bg-[#C62553] px-6 py-[9px] text-white hover:bg-[#B01F48]">
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-12 md:hidden">
            <button className="text-gray-700 md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
              {isMenuOpen ? <Menu className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            <div className="h-8 w-8 rounded-full bg-[#C6255315] flex items-center justify-center text-[#C62553]">R</div>
          </div>
        </div>
      </nav>

      {/* Mobile slide-out menu */}
      <div
        className={`fixed inset-0 bg-black/20 z-50 md:hidden transition-opacity duration-500 ease-in-out ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMenu}
        style={{
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      ></div>

      {/* Slide-out panel */}
      <div
        className={`fixed inset-y-0 left-0 w-[280px] bg-white z-50 md:hidden transform transition-transform duration-500 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <Link to="/" className="flex items-center gap-2 text-xl font-semibold text-[#C62553]">
            <Heart className="h-5 w-5" />
            <span>HeartBridge</span>
          </Link>
          <button onClick={toggleMenu} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-col h-[calc(100%-64px)] justify-between">
          <div className="p-4 space-y-4">
            <Link
              to="/dashboard"
              className="flex items-center gap-3 py-2 text-gray-700 hover:text-[#C62553] transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              <LayoutDashboard className="h-5 w-5 text-[#C62553]" />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/new-relationship"
              className="flex items-center gap-3 py-2 text-gray-700 hover:text-[#C62553] transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              <User className="h-5 w-5 text-[#C62553]" />
              <span>New Relationship</span>
            </Link>
          </div>

          <div className="p-4 border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 py-2 text-gray-700 hover:text-[#C62553] w-full text-left transition-colors duration-200"
            >
              <LogOut className="h-5 w-5 text-[#C62553]" />
              <span>Log out</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

