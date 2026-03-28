import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer.jsx';
import Navbar from "../Navbar/HNavbar.jsx";
import api from '../../api/axios.js';

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  async function handleSignup(e) {
    e.preventDefault();

    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email.");
      setSuccessMessage("");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      setSuccessMessage("");
      return;
    }

    try {
      const response = await api.post("/auth/signup", {
        email,
        password
      });
      const data = response.data;
      if (response.status === 200) {
        setSuccessMessage("Account created successfully!");
        setErrorMessage("");
        setEmail("");
        setPassword("");
        navigate("/auth/signin");
      } else {
        setErrorMessage(data.message || "Signup failed");
        setSuccessMessage("");
      }
    } catch (error) {
      setErrorMessage("Something went wrong during signup");
      setSuccessMessage("");
      console.error("Signup error:", error);
    }
  }

  return (
    <div className="min-h-screen bg-green-200 dark:bg-green-900 flex flex-col">
      <Navbar />
      <div className="flex-1 flex justify-center items-center px-4 pt-20">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md p-8 md:p-12">
          <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-3">
            Signup
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
            Please sign up to access personalized pesticides information, crop specification, and more.
          </p>

          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Enter Your Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Create Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Create Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 mb-4 border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>

            {successMessage && (
              <p className="text-green-500 text-sm text-center">{successMessage}</p>
            )}
            {errorMessage && (
              <p className="text-red-500 text-sm text-center">{errorMessage}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full transition shadow-md"
            >
              Submit
            </button>

            {/* Extra bottom spacing to match login card height */}
            <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
              Already have an account?{' '}
              <a href="/auth/signin" className="text-green-600 dark:text-green-400 font-semibold hover:underline">
                Log In
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}