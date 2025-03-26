import { useState } from "react";
import { Heart, Menu, X, Sparkles, User } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <nav className="w-full  bg-white px-4 py-3 ">
      <div className=" container flex items-center justify-between">
        {/* Logo and brand name */}
        <a
          href="/"
          className="flex items-center gap-2 text-xl font-semibold text-rose-500"
        >
          <Heart className="h-5 w-5 fill-rose-500" />
          <span>HeartBridge</span>
        </a>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-7 md:flex">
          {isLoggedIn ? (
            <>
              <a
                href="/upgrade"
                className="flex items-center gap-1 rounded-full border border-gray-200 px-4 py-1.5 text-[18px] font-medium text-rose-500 hover:bg-[#FDF2F6]"
              >
                <Sparkles className="h-4 w-4 text-rose-500" />
                Upgrade
              </a>
              <div className="relative">
                <button
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-[#FDF2F6]"
                  onClick={handleLogout}
                  aria-label="User profile"
                >
                  <User className="h-5 w-5 text-rose-500" />
                </button>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={handleLogin}
                className="text-gray-700 hover:text-rose-500 text-sm font-bold"
              >
                Log in
              </button>
              <a
                href="/signup"
                className="rounded-full bg-rose-500 px-6 py-[9px] text-white hover:bg-rose-600"
              >
                Sign up
              </a>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="text-gray-700 md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="mt-3 border-t border-gray-100 py-3 md:hidden">
          <div className="flex flex-col gap-3 px-4">
            {isLoggedIn ? (
              <>
                <a
                  href="/upgrade"
                  className="flex items-center gap-1 py-2 text-gray-700 hover:text-rose-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Sparkles className="h-4 w-4 text-rose-500" />
                  Upgrade
                </a>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-1 py-2 text-gray-700 hover:text-rose-500"
                >
                  <User className="h-4 w-4" />
                  Profile
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="py-2 text-gray-700 hover:text-rose-500"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    handleLogin();
                    setIsMenuOpen(false);
                  }}
                  className="py-2 text-gray-700 hover:text-rose-500"
                >
                  Log in
                </button>
                <a
                  href="/signup"
                  className="rounded-full bg-rose-500 px-6 py-2 text-center text-white hover:bg-rose-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign up
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
