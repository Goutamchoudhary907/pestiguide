import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../Footer/Footer.jsx";
import ANavbar from "../Navbar/ANavbar.jsx";
import HNavbar from "../Navbar/HNavbar.jsx";
import api from '../../api/axios.js';
const Pesticides = () => {
  const { id } = useParams();
  const [pesticide, setPesticide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchPesticide = async () => {
      try {
        const response = await api.get(`/api/pesticides/${id}`);
        setPesticide(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || "Failed to fetch pesticide details"
        );
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPesticide();
  }, [id, navigate, location.pathname]);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/auth/status", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsLoggedIn(response.data.isAuthenticated);
      } catch (error) {
        setIsLoggedIn(false);
        console.error("Error checking auth status:", error);
      }
    };
    checkAuthStatus();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <ANavbar />
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading pesticide details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <ANavbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center">
            <h3 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">
              Error Loading Pesticide Data
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!pesticide) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <ANavbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Pesticide Not Found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              The requested pesticide could not be found.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <HNavbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              You Need to Be Logged In
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Please log in to view pesticide details.
            </p>
            <button
              onClick={() => {
                navigate(`/auth/signin?redirect=${encodeURIComponent(location.pathname + location.search)}`);
              }}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
            >
              Login
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ANavbar />
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 pt-24">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-8 text-center">
          {pesticide.Name}
        </h1>

        {/* Info cards row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            {
              title: "Active Ingredients",
              content: pesticide["Active Ingredients"] || pesticide.Name,
            },
            {
              title: "Application Method",
              content: pesticide["Application Method"] || "Spray",
            },
            pesticide["Target Species"] && {
              title: "Target Species",
              content: pesticide["Target Species"],
            },
          ]
            .filter(Boolean)
            .map((card, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border border-gray-100 dark:border-gray-700"
              >
                <h4 className="text-lg font-semibold text-green-700 dark:text-green-400 mb-2">
                  {card.title}
                </h4>
                <p className="text-gray-700 dark:text-gray-300">{card.content}</p>
              </div>
            ))}
        </div>

        {/* Safety Precautions */}
        {pesticide["Safety Precautions"]?.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Safety Precautions
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              {pesticide["Safety Precautions"].map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Environmental Impact */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8 overflow-x-auto">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Environmental Impact
          </h3>
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Impact Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {pesticide["Environmental Impact"]
                ? Object.entries(pesticide["Environmental Impact"])
                    .filter(([category]) => category !== "_id")
                    .map(([category, data], index) => (
                      <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                          {data.Impact_Level || "Low"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                          {data.Notes || "General impact may occur."}
                        </td>
                      </tr>
                    ))
                : // Fallback default data
                  [
                    { category: "Soil", level: "Low", notes: "May persist in soil to varying degrees." },
                    { category: "Water", level: "Moderate", notes: "Potential for runoff and contamination." },
                    { category: "Wildlife", level: "Low", notes: "May pose risks to some wildlife." },
                    { category: "Beneficial Insects", level: "Moderate", notes: "Potential to affect beneficial insect populations." },
                  ].map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {item.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {item.level}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {item.notes}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        {/* Usage Instructions */}
        {pesticide["Usage Instructions"]?.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Usage Instructions
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              {pesticide["Usage Instructions"].map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Advantages & Disadvantages */}
        {(pesticide.Advantages?.length > 0 || pesticide.Disadvantages?.length > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {pesticide.Advantages?.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h4 className="text-lg font-semibold text-green-700 dark:text-green-400 mb-3">
                  Advantages
                </h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  {pesticide.Advantages.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {pesticide.Disadvantages?.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h4 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-3">
                  Disadvantages
                </h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  {pesticide.Disadvantages.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Pesticides;