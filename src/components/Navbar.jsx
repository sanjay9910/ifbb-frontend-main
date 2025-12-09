import React, { useEffect, useState } from "react";
import Logo from "../assets/Logo.png";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { RiCloseFill, RiMenu3Line } from "react-icons/ri";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setAnimate(true);

    // Check token on mount
    const token = localStorage.getItem("user-auth-token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user-auth-token");
    setIsLoggedIn(false);
  };

  const navigation = [
    { name: "Home", href: "" },
    { name: "About", href: "/about" },
    { name: "Courses", href: "/course" },
    { name: "Gallery", href: "/gallery" },
    { name: "Certificates", href: "/certificates" },
    { name: "News", href: "/news" },
    { name: "Contact US", href: "/contact" },
  ];

  return (
    <>
      <nav className={`py-2 transition-all duration-700 ease-out ${animate ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="w-14">
              <Link to={'/'}>
                <img src={Logo} alt="logo" className="transition-transform duration-500 hover:scale-105" />
              </Link>
            </div>

            <div className="hidden md:flex items-center justify-center gap-4 lg:gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="hover:text-blue-600 font-semibold transition duration-300 transform hover:scale-105 text-sm"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="max-md:hidden px-4 py-1 bg-red-600 font-semibold text-white rounded-sm transition duration-300 hover:scale-105"
              >
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button className="max-md:hidden px-4 py-1 bg-[#2424B9] font-semibold text-white rounded-sm transition duration-300 hover:scale-105">
                  Join Now
                </button>
              </Link>
            )}

            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-2xl focus:outline-none transition-transform duration-300"
                aria-label="Toggle Menu"
              >
                {isOpen ? <RiCloseFill /> : <RiMenu3Line />}
              </button>
            </div>
          </div>
        </div>

        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? "max-h-screen opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-4"
            }`}
        >
          <div className="flex flex-col items-center justify-center bg-white shadow-md px-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block py-2 text-center text-gray-700 hover:text-blue-600 transition duration-300 font-semibold text-sm"
              >
                {item.name}
              </Link>
            ))}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="px-4 py-1 my-2 bg-red-600 font-semibold text-white rounded-sm transition duration-300 hover:scale-105"
              >
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button className="px-4 py-1 my-2 bg-[#2424B9] font-semibold text-white rounded-sm transition duration-300 hover:scale-105">
                  Join Now
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
