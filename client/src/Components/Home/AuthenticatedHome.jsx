import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios.js';
import ANavbar from "../Navbar/AuthNavbar.jsx";
import bghome from '../../assets/Bg Home.jpg';

export default function AuthenticatedHome() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [crops, setCrops] = useState([]);
  const [pesticides, setPesticides] = useState([]);

  // (existing console.log kept)
  crops.forEach(crop => console.log("  Crop Name:", JSON.stringify(crop.name)));

  const handleSeasonSelect = (season) => {
    navigate(`/crops?season=${season}`);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    let formattedSearchTerm = '';
    const trimmedSearchTerm = searchTerm.trim();
    console.log("Formatted search term:", formattedSearchTerm);

    if (trimmedSearchTerm) {
      formattedSearchTerm = trimmedSearchTerm.charAt(0).toUpperCase() + trimmedSearchTerm.slice(1).toLowerCase();
    }

    if (!trimmedSearchTerm) {
      navigate('/crops');
      return;
    }

    const validSeasons = ['Kharif', 'Rabi', 'Zaid'];
    if (validSeasons.includes(formattedSearchTerm)) {
      navigate(`/crops?season=${formattedSearchTerm}`);
      return;
    }

    api.get(`/crops/search?query=${encodeURIComponent(formattedSearchTerm)}`)
      .then(response => {
        setCrops(response.data);
        console.log("Search Results for Crops:", response.data);
        const matchedCrop = response.data.find(crop => crop.name === formattedSearchTerm);
        console.log("Matched crop:", matchedCrop);
        if (matchedCrop) {
          navigate(`/pests?crop=${encodeURIComponent(matchedCrop.name)}`);
        } else {
          navigate(`/search-results?query=${encodeURIComponent(trimmedSearchTerm)}`);
        }
      })
      .catch(error => {
        console.error("Error searching for crops:", error);
        navigate(`/search-results?query=${encodeURIComponent(trimmedSearchTerm)}`);
      });
  };

  return (
    <div>
      <ANavbar />

      {/* Hero section with background */}
      <div className="relative w-full min-h-screen">
        <img
          src={bghome}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-sm"
        />
        <div className="absolute inset-0 bg-black/30" /> 

        {/* Content container – flex column, centered */}
        <div className="relative  flex flex-col items-center justify-center min-h-screen px-4 py-20 text-white text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            Smart Pesticides Management <br /> For Better Farming
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 drop-shadow">
            Get expert recommendations based on your season and crop type
          </p>

          {/* Search bar – responsive width */}
          <div className="w-full max-w-2xl bg-white/20 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-lg mb-12">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleSearchSubmit();
                }
              }}
              placeholder="Search for pesticides, crops..."
              className="w-full px-4 py-3 text-center text-base sm:text-lg rounded-full bg-white/30 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-green-400 transition"
            />
          </div>

          {/* Season selection */}
          <h2 className="text-xl sm:text-2xl font-medium mb-4 drop-shadow">
            Select Your Season
          </h2>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {['Kharif', 'Rabi', 'Zaid'].map((season) => (
              <button
                key={season}
                onClick={() => handleSeasonSelect(season)}
                className="w-36 sm:w-48 h-20 sm:h-24 rounded-2xl border-2 border-green-500 bg-white/10 hover:bg-white/20 hover:scale-105 transition text-white font-medium text-base sm:text-lg shadow-md"
              >
                {season} Season
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}