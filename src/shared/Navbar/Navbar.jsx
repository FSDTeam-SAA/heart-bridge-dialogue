import { useState, useEffect, useRef } from "react";
import {
  Heart,
  Menu,
  X,
  Sparkles,
  User,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";
import { auth } from "../../config/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsMenuOpen(false);
      setIsDropdownOpen(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <>
      <nav className="w-full bg-white px-4 py-3 sticky top-0 z-40">
        <div className="container flex items-center justify-between">
          {/* Logo and brand name */}
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold text-[#C62553]"
          >
            <Heart className="h-5 w-5" />
            <span>HeartBridge</span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-7 md:flex">
            {user ? (
              <>
                <Link
                  to="/upgrade"
                  className="flex items-center gap-1 rounded-full border border-gray-200 px-4 py-1.5 text-[18px] font-medium text-[#C62553] hover:bg-[#C6255310]"
                >
                  <Sparkles className="h-4 w-4 text-[#C62553]" />
                  Upgrade
                </Link>

                {/* this dropdown menu is for desktop user */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-[#C6255310]"
                    onClick={toggleDropdown}
                    aria-label="User profile"
                  >
                    <User className="h-5 w-5 text-[#C62553]" />
                  </button>

                  {/* User dropdown menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 rounded-lg bg-white shadow-lg border border-gray-100 z-50 p-2">
                      <Link to={"/account"}>
                        <div className="px-4 pb-2 mb-1 border-b border-gray-100 hover:bg-[#C6255310] hover:text-[#C62553] rounded-lg">
                          <div className="font-medium">Account</div>
                          <div className="text-sm text-gray-500">
                            rifatbdcallingit23@gmail.com
                          </div>
                        </div>
                      </Link>

                      <div className="py-1">
                        <Link
                          to="/dashboard"
                          className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-[#C6255310] hover:text-[#C62553] rounded-lg"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <LayoutDashboard className="h-5 w-5 text-[#C62553]" />
                          <span>Dashboard</span>
                        </Link>

                        <Link
                          to="/"
                          className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-[#C6255310] hover:text-[#C62553] rounded-lg"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <User className="h-5 w-5 text-[#C62553]" />
                          <span>New Relationship</span>
                        </Link>

                        <Link
                          to={"/upgrade"}
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <div className="px-4 py-2 hover:bg-[#C6255310] hover:text-[#C62553] rounded-l">
                            <div className="flex items-center gap-3">
                              <button className="bg-[#C62553] text-white text-sm px-3 py-1 rounded-full">
                                Upgrade
                              </button>
                              <span className="text-gray-700">
                                Manage subscription
                              </span>
                            </div>
                          </div>
                        </Link>
                      </div>

                      <div className="pt-1 border-t border-gray-100 mt-1">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-[#C6255310] hover:text-[#C62553] w-full text-left"
                        >
                          <LogOut className="h-5 w-5 text-[#C62553]" />
                          <span>Log out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="text-gray-700 hover:text-[#C62553] text-sm font-bold">
                    Log in
                  </button>
                </Link>
                <Link
                  to="/signup"
                  className="rounded-full bg-[#C62553] px-6 py-[9px] text-white hover:bg-[#B01F48]"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          {user ? (
            <div className="flex items-center gap-12 md:hidden">
              <button
                className="text-gray-700 md:hidden"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <Menu className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>

              {/* this dropdown for mobile user */}
              <div className="relative" ref={dropdownRef}>
                <button
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-[#C6255310]"
                  onClick={toggleDropdown}
                  aria-label="User profile"
                >
                  <User className="h-5 w-5 text-[#C62553]" />
                </button>

                {/* User dropdown menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-lg bg-white shadow-lg border border-gray-100 z-50 p-2">
                    <Link to={"/account"}>
                      <div className="px-4 pb-2 mb-1 border-b border-gray-100 hover:bg-[#C6255310] hover:text-[#C62553] rounded-lg">
                        <div className="font-medium">Account</div>
                        <div className="text-sm text-gray-500">
                          rifatbdcallingit23@gmail.com
                        </div>
                      </div>
                    </Link>

                    <div className="py-1">
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-[#C6255310] hover:text-[#C62553] rounded-lg"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <LayoutDashboard className="h-5 w-5 text-[#C62553]" />
                        <span>Dashboard</span>
                      </Link>

                      <Link
                        to="/new-relationship"
                        className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-[#C6255310] hover:text-[#C62553] rounded-lg"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <User className="h-5 w-5 text-[#C62553]" />
                        <span>New Relationship</span>
                      </Link>

                      <Link>
                        <div className="px-4 py-2 hover:bg-[#C6255310] hover:text-[#C62553] rounded-l">
                          <div className="flex items-center gap-3">
                            <button className="bg-[#C62553] text-white text-sm px-3 py-1 rounded-full">
                              Upgrade
                            </button>
                            <span className="text-gray-700">
                              Manage subscription
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>

                    <div className="pt-1 border-t border-gray-100 mt-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-[#C6255310] hover:text-[#C62553] w-full text-left"
                      >
                        <LogOut className="h-5 w-5 text-[#C62553]" />
                        <span>Log out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              <Link to="/login">
                <button className="text-gray-700 hover:text-[#C62553] text-sm font-bold">
                  Log in
                </button>
              </Link>
              <Link
                to="/signup"
                className="rounded-full bg-[#C62553] px-6 py-[9px] text-white hover:bg-[#B01F48]"
              >
                Sign up
              </Link>
            </>
          )}
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
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-semibold text-[#C62553]"
          >
            <Heart className="h-5 w-5 fill-[#C62553]" />
            <span>HeartBridge</span>
          </Link>
          <button
            onClick={toggleMenu}
            className="text-gray-400 hover:text-gray-600"
          >
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
  );
}
