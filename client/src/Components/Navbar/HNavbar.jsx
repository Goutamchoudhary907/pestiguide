import React from "react";
import { useNavigate } from "react-router-dom";

const HNavbar = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/auth/signin');
  };

  const handleSignupClick = () => {
    navigate('/auth/signup');
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <nav className="fixed top-0 w-full z-10 flex items-center justify-between px-6 md:px-16 py-5 bg-white/95 dark:bg-gray-900/95 shadow-md backdrop-blur-sm">
      {/* Brand */}
      <button
        onClick={handleHomeClick}
        className="text-2xl md:text-3xl font-bold text-green-700 dark:text-green-400 hover:opacity-80 transition"
      >
        PestiGuide
      </button>

      {/* Navigation Links */}
      <ul className="flex gap-6 md:gap-12 text-gray-800 dark:text-gray-200">
        <li>
          <button
            onClick={handleHomeClick}
            className="hover:text-green-600 dark:hover:text-green-400 transition font-medium"
          >
            Home
          </button>
        </li>
        <li>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); /* scroll to section or navigate */ }}
            className="hover:text-green-600 dark:hover:text-green-400 transition font-medium"
          >
            Environmental Impact
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); /* handle about */ }}
            className="hover:text-green-600 dark:hover:text-green-400 transition font-medium"
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); /* handle contact */ }}
            className="hover:text-green-600 dark:hover:text-green-400 transition font-medium"
          >
            Contact
          </a>
        </li>
      </ul>

      {/* Auth Buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleLoginClick}
          className="px-4 py-2 rounded-full border-2 border-green-700 dark:border-green-400 text-green-700 dark:text-green-400 font-medium hover:bg-green-700 hover:text-white dark:hover:bg-green-400 dark:hover:text-gray-900 transition"
        >
          Login
        </button>
        <button
          onClick={handleSignupClick}
          className="px-4 py-2 rounded-full bg-green-700 dark:bg-green-400 text-white dark:text-gray-900 font-medium hover:bg-green-800 dark:hover:bg-green-500 transition"
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default HNavbar;