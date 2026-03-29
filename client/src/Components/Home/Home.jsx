import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PublicNavbar from "../Navbar/PublicNavbar.jsx";
import AuthNavbar from "../Navbar/AuthNavbar.jsx";
import AuthenticatedHome from "../Home/AuthenticatedHome.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import bbgimg from "../../assets/BackGroundHome.jpg";
import img1 from "../../assets/img1.jpg";
import img2 from "../../assets/img2.jpg";
import img3 from "../../assets/img3.jpg";
import api from '../../api/axios.js';
export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [unauthSearchTerm, setUnauthSearchTerm] = useState("");

  useEffect(() => {
    const checkAuthStatus = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/auth/status", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsLoggedIn(response.data.isAuthenticated);
      } catch (error) {
        setIsLoggedIn(false);
        console.error("Error checking auth status:", error);
      } finally {
        setLoading(false);
      }
    };
    checkAuthStatus();
  }, []);

  const handleSeasonSelect = (season) => {
    navigate(`/crops?season=${season}`);
  };

  const handleUnauthSearchChange = (e) => {
    setUnauthSearchTerm(e.target.value);
  };

  const handleUnauthSearchSubmit = () => {
    const trimmed = unauthSearchTerm.trim();
    if (!trimmed) {
      navigate('/crops');
      return;
    }

    const formatted = trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();

    const validSeasons = ["Kharif", "Rabi", "Zaid"];
    if (validSeasons.includes(formatted)) {
      navigate(`/crops?season=${formatted}`);
      return;
    }

    api.get(`/crops/search?query=${encodeURIComponent(formatted)}`)
      .then((response) => {
        const matchedCrop = response.data.find((crop) => crop.name === formatted);
        if (matchedCrop) {
          navigate(`/pests?crop=${encodeURIComponent(matchedCrop.name)}`);
        } else {
          navigate(`/search-results?query=${encodeURIComponent(trimmed)}`);
        }
      })
      .catch(() => {
        navigate(`/search-results?query=${encodeURIComponent(trimmed)}`);
      });
  };

   const handleButtonClickSearch = (searchTerm) => {
      setUnauthSearchTerm(searchTerm);
      let formattedSearchTerm = searchTerm.trim();
      if (formattedSearchTerm) {
      formattedSearchTerm = formattedSearchTerm.charAt(0).toUpperCase() + formattedSearchTerm.slice(1).toLowerCase();
       }
  }

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      {isLoggedIn ? (
        <>
          <AuthNavbar />
          <AuthenticatedHome />
        </>
      ) : (
        <>
          <PublicNavbar />

       {/* Hero section */}
<div className="relative w-full min-h-[24rem] sm:min-h-[32rem] md:min-h-[45rem]">
  <img
    src={bbgimg}
    alt="Farming"
    className="absolute inset-0 w-full h-full object-cover"
  />
  <div className="absolute inset-0 bg-black/40" />

  <div className="relative flex flex-col md:flex-row items-center justify-between 
    h-full min-h-[24rem] sm:min-h-[32rem] md:min-h-[45rem] 
    px-4 sm:px-8 md:px-16 pt-20 sm:pt-25 md:pt-0 lg:pt-28 pb-12 sm:pb-20 md:pb-36 gap-6">

    <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold 
      text-white drop-shadow-lg text-center md:text-left 
      w-full md:w-1/2 leading-tight lg:-mt-8 xl:-mt-34">
      Smart Pesticides Management <br /> For Better Farming
    </h1>

    <div className="hidden md:flex flex-col gap-4 w-1/2 items-end">
      <div className="flex gap-4 justify-end">
        <img src={img1} alt="" className="w-40 lg:w-56 h-40 lg:h-56 object-cover rounded-2xl shadow-lg" />
        <img src={img2} alt="" className="w-44 lg:w-60 h-36 lg:h-48 object-cover rounded-2xl shadow-lg self-start" />
      </div>
      <img src={img3} alt="" className="w-44 lg:w-60 h-36 lg:h-48 object-cover rounded-2xl shadow-lg self-end" />
    </div>
  </div>

  <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-8 md:left-16
    w-[95%] sm:w-[85%] md:w-[45%] lg:w-[42%] max-w-3xl
    bg-white/20 backdrop-blur-md rounded-2xl p-3 sm:p-5 shadow-lg">
    <label className="block text-center text-white text-lg sm:text-2xl md:text-3xl mb-2 sm:mb-3 font-medium">
      Find What You Need
    </label>
    <input
      type="text"
      value={unauthSearchTerm}
      onChange={handleUnauthSearchChange}
      onKeyDown={(e) => e.key === "Enter" && handleUnauthSearchSubmit()}
      placeholder="Search for pesticides, crops..."
      className="w-full px-4 py-2 sm:py-3 text-center text-base sm:text-lg rounded-full 
        bg-white/30 text-white placeholder-white/70 outline-none 
        focus:ring-2 focus:ring-green-400 transition"
    />
    <div className="flex justify-center gap-3 mt-3 flex-wrap">
      {['Rice', 'Rabi', 'Wheat'].map((term) => (
        <button
          key={term}
          onClick={() => handleButtonClickSearch(term)}
          className="px-4 sm:px-5 py-1.5 sm:py-2 bg-green-600 hover:bg-green-700 
            text-white rounded-full text-sm sm:text-base transition"
        >
          {term}
        </button>
      ))}
    </div>
  </div>
</div>

{/* Seasons Section */}
<div className="py-12 sm:py-16 md:py-20 px-4 text-center">
  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12">
    Select Your Season
  </h2>
  <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
    {[
      { name: "Kharif Season", months: "June-October",   color: "bg-green-100 dark:bg-green-900/30" },
      { name: "Rabi Season",   months: "October-March",  color: "bg-blue-100 dark:bg-blue-900/30"  },
      { name: "Zaid Season",   months: "March-June",     color: "bg-yellow-100 dark:bg-yellow-900/30" },
    ].map((season) => (
      <button
        key={season.name}
        onClick={() => handleSeasonSelect(season.name.split(" ")[0])}
        className={`w-44 sm:w-56 md:w-64 h-28 sm:h-36 md:h-40 rounded-2xl ${season.color} 
          border border-gray-300 dark:border-gray-700 hover:scale-105 transition shadow-md`}
      >
        <div className="font-bold text-lg sm:text-xl">{season.name}</div>
        <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{season.months}</div>
      </button>
    ))}
  </div>
</div>
 </>
      )}
          {/* Key Features Section */}
          <div className="bg-gray-50 dark:bg-gray-800 py-20 px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {[
                { title: "Pesticide Database", desc: "Comprehensive information about various pesticides and their applications." },
                { title: "Comparison Tool", desc: "Compare different pesticides to make informed decisions." },
                { title: "Usage Guidelines", desc: "Step-by-step instructions for safe and effective pesticide use." },
                { title: "Environmental Impact", desc: "Understand the environmental effects of different pesticides." },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition"
                >
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Environmental Impact Section */}
          <div className="py-20 px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Environmental Impact Indicators</h2>
            <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
              {[
                { title: "Water Impact", level: "Moderate", color: "bg-blue-100 dark:bg-blue-900/30" },
                { title: "Biodiversity", level: "High", color: "bg-red-100 dark:bg-red-900/30" },
                { title: "Soil Quality", level: "Low", color: "bg-green-100 dark:bg-green-900/30" },
              ].map((indicator) => (
                <div
                  key={indicator.title}
                  className={`w-64 p-6 rounded-2xl ${indicator.color} border border-gray-300 dark:border-gray-700 text-center shadow`}
                >
                  <h3 className="text-xl font-bold mb-2">{indicator.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{indicator.level} Impact Level</p>
                </div>
              ))}
            </div>
          </div>

          <Footer />
       
    </div>
  );
}