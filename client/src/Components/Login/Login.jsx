import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../Navbar/PublicNavbar.jsx";
import api from '../../api/axios.js';
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  async function handleLogin(e) {
    e.preventDefault();

    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email.");
      return;
    }

    try {
      const response = await api.post("/auth/signin", {
        email,
        password
      });
      const data = response.data;
      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        const redirectTo = searchParams.get('redirect');
        if (redirectTo) {
          navigate(decodeURIComponent(redirectTo));
        } else {
          navigate("/home");
        }
      } else {
        setErrorMessage(data.message || "Login failed");
      }
    } catch (error) {
      setErrorMessage("Something went wrong");
    }
  }

  return (
<div className="min-h-screen bg-green-200 dark:bg-green-900 flex flex-col">
  <Navbar />
  <div className="flex-1 flex justify-center items-center px-4 pt-20">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md p-8 md:p-10">
          <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-3">
            Welcome Back
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
            Please login to access personalized pesticides information, crop specification, and more.
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
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
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>

            <div className="text-right">
              <a href="#" className="text-sm text-green-600 dark:text-green-400 hover:underline">
                Forgot Password?
              </a>
            </div>

            {errorMessage && (
              <p className="text-red-500 text-sm text-center">{errorMessage}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full transition shadow-md"
            >
              Submit
            </button>

            <p className="text-center text-gray-600 dark:text-gray-400">
              New to PestiGuide?{' '}
              <a href="/auth/signup" className="text-green-600 dark:text-green-400 font-semibold hover:underline">
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}