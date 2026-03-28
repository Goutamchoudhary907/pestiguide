import React from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const ANavbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/auth/signout");
      localStorage.removeItem("token");
      navigate("/", { state: { forceRefresh: true } });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-10 flex justify-between items-center px-6 md:px-16 py-5 bg-white/95 dark:bg-gray-900/95 shadow-md backdrop-blur-sm">
      <button
        onClick={() => navigate("/")}
        className="text-2xl md:text-3xl font-bold text-green-700 dark:text-green-400 hover:opacity-80 transition"
      >
        PestiGuide
      </button>

      <div className="flex gap-6 md:gap-12">
        <button
          onClick={() => navigate("/")}
          className="text-gray-800 dark:text-gray-200 font-medium hover:text-green-600 dark:hover:text-green-400 transition"
        >
          Home
        </button>
        <button
          onClick={handleLogout}
          className="text-gray-800 dark:text-gray-200 font-medium hover:text-green-600 dark:hover:text-green-400 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default ANavbar;