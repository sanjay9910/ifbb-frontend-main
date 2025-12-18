// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import Logo from "../assets/Logo.png"; // adjust path if needed
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { RiCloseFill, RiMenu3Line } from "react-icons/ri";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Courses", href: "/course" },
  { name: "Gallery", href: "/gallery" },
  { name: "Certificates", href: "/certificates" },
  { name: "News", href: "/news" },
  { name: "Contact US", href: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // small entrance animation trigger
    setMounted(true);

    // initial token check
    const token = localStorage.getItem("user-auth-token");
    setIsLoggedIn(Boolean(token));

    // listen for token changes in other tabs
    const onStorage = (e) => {
      if (e.key === "user-auth-token") {
        setIsLoggedIn(Boolean(e.newValue));
      }
    };
    window.addEventListener("storage", onStorage);

    // close on escape
    const onKey = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  // close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("user-auth-token");
    setIsLoggedIn(false);
    // optional: navigate to home or login if you want
    // navigate('/');
  };

  return (
    <>
      {/* Inline style block for a couple of custom keyframes used below */}
      <style>{`
        @keyframes float-bob {
          0% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
          100% { transform: translateY(0); }
        }
        @keyframes slideInDown {
          0% { opacity: 0; transform: translateY(-10px) scale(0.995); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      <nav
        className={`w-full z-50 bg-white backdrop-blur-sm border-b border-gray-100 sticky top-0 left-0 right-0 transition-all duration-500 ${
          mounted ? "animate-[slideInDown_450ms_ease-out]" : "opacity-0 -translate-y-3"
        }`}
        aria-label="Primary Navigation"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-21">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center" aria-label="Home">
                <div
                  className="w-14 h-14 rounded-md flex items-center justify-center overflow-hidden shadow-sm transform transition-transform duration-500 hover:scale-[1.06] motion-safe:animate-[float-bob_3s_ease-in-out_infinite]"
                  title="Logo"
                >
                  <img src={Logo} alt="Logo" className="w-full h-full object-contain" />
                </div>
                <div className="hidden sm:flex flex-col ml-3">
                  <span className="text-sm font-bold text-slate-800 leading-none">Your Academy</span>
                  <span className="text-xs text-slate-500 -mt-0.5">Learn & Grow</span>
                </div>
              </Link>
            </div>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  end={item.href === "/"}
                  className={({ isActive }) =>
                    `relative px-2 py-1 font-semibold text-sm transition-all duration-200 transform hover:scale-[1.03] ${
                      isActive
                        ? "text-blue-600"
                        : "text-slate-700 hover:text-blue-600"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{item.name}</span>
                      <span
                        aria-hidden
                        className={`absolute left-0 right-0 -bottom-1 h-0.5 rounded-full transition-all duration-300 ${
                          isActive ? "bg-blue-600 scale-x-100" : "bg-blue-600 scale-x-0"
                        }`}
                        style={{ transformOrigin: "left center" }}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Actions (desktop) */}
            <div className="hidden md:flex items-center gap-4">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-semibold shadow hover:brightness-95 transition"
                >
                  Logout
                </button>
              ) : (
                <Link to="/login" aria-label="Join now">
                  <button className="px-4 py-2 bg-gradient-to-r from-[#2424B9] to-[#4b4bd9] text-white rounded-md text-sm font-semibold shadow hover:brightness-95 transition">
                    Join Now
                  </button>
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen((s) => !s)}
                className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition-transform duration-200"
                aria-label="Toggle menu"
                aria-expanded={isOpen}
              >
                {isOpen ? <RiCloseFill className="text-2xl" /> : <RiMenu3Line className="text-2xl" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu panel */}
        <div
          className={`md:hidden`}
          aria-hidden={!isOpen}
        >
          {/* Overlay */}
          <div
            className={`fixed inset-0 z-40 transition-opacity duration-300 ${isOpen ? "opacity-60 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            style={{ backgroundColor: "rgba(15, 23, 42, 0.6)" }}
            onClick={() => setIsOpen(false)}
          />

          {/* Slide down panel */}
          <div
            className={`fixed left-0 right-0 top-16 z-50 mx-4 rounded-lg shadow-lg overflow-hidden transform transition-all duration-350 ${
              isOpen ? "translate-y-0 opacity-100 max-h-[80vh]" : "-translate-y-4 opacity-0 max-h-0"
            }`}
            role="dialog"
            aria-modal="true"
          >
            <div className="bg-white p-4 space-y-2">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  end={item.href === "/"}
                  className={({ isActive }) =>
                    `block w-full text-center py-3 rounded-md font-semibold transition-colors duration-200 ${
                      isActive ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-gray-50"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}

              <div className="pt-2 border-t border-gray-100 mt-2">
                {isLoggedIn ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full px-4 py-2 mt-2 bg-red-600 text-white rounded-md font-semibold"
                  >
                    Logout
                  </button>
                ) : (
                  <Link to="/login">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="w-full px-4 py-2 mt-2 bg-gradient-to-r from-[#2424B9] to-[#4b4bd9] text-white rounded-md font-semibold"
                    >
                      Join Now
                    </button>
                  </Link>
                )}
              </div>

              <div className="text-center text-xs text-slate-400 mt-2">
                &copy; {new Date().getFullYear()} Your Academy
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* page outlet */}
      <Outlet />
    </>
  );
};

export default Navbar;
