import React from "react";
import { useNavigate } from "react-router-dom";

const PublicNavbar = () => {
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
    <nav className="fixed top-0 w-full z-10 flex items-center justify-between px-4 sm:px-6 md:px-16 py-4 sm:py-5 bg-white/95 dark:bg-gray-900/95 shadow-md backdrop-blur-sm">
      <button
        onClick={handleHomeClick}
        className="text-xl sm:text-2xl md:text-3xl font-bold text-green-700 dark:text-green-400 hover:opacity-80 transition whitespace-nowrap"
      >
        PestiGuide
      </button>

      <div className="flex gap-1 sm:gap-2">
        <button
          onClick={handleLoginClick}
          className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border-2 border-green-700 dark:border-green-400 text-green-700 dark:text-green-400 font-medium text-sm sm:text-base hover:bg-green-700 hover:text-white dark:hover:bg-green-400 dark:hover:text-gray-900 transition"
        >
          Login
        </button>
        <button
          onClick={handleSignupClick}
          className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-green-700 dark:bg-green-400 text-white dark:text-gray-900 font-medium text-sm sm:text-base hover:bg-green-800 dark:hover:bg-green-500 transition"
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default PublicNavbar;