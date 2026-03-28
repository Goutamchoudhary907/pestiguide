// frontend/src/Pages/Ahome.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ANavbar from "../../Components/Navbar/ANavbar";
import bghome from '../../assets/Bg Home.jpg';

export default function Ahome() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [crops, setCrops] = useState([]);
  const [pesticides, setPesticides] = useState([]);


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

    axios.get(`http://localhost:3000/crops/search?query=${encodeURIComponent(formattedSearchTerm)}`)
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

      <div className="relative w-full mt-16">
        <img
          src={bghome}
          alt=""
          className="w-full h-[45rem] object-cover blur-sm"
        />

        <h1 className="absolute top-20 left-1/2 transform -translate-x-1/2 text-5xl font-bold text-white text-center drop-shadow-lg whitespace-nowrap">
          Smart Pesticides Management For Better Farming
        </h1>

        <p className="absolute top-40 left-1/2 transform -translate-x-1/2 text-3xl text-white text-center drop-shadow">
          Get expert recommendations based on your season and crop type
        </p>

        <div className="absolute top-64 left-1/2 transform -translate-x-1/2 w-[66rem] max-w-[90vw] bg-white/20 backdrop-blur-md rounded-2xl p-6 shadow-lg">
          <div className="mb-4">
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
              className="w-full px-5 py-3 text-center text-xl rounded-full bg-white/30 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-green-400 transition"
            />
          </div>
        </div>

        <h2 className="absolute top-[400px] left-1/2 transform -translate-x-1/2 text-2xl font-medium text-white drop-shadow">
          Select Your Season
        </h2>

        <div className="absolute top-[450px] left-1/2 transform -translate-x-1/2 flex gap-8">
          {['Kharif', 'Rabi', 'Zaid'].map((season) => (
            <button
              key={season}
              onClick={() => handleSeasonSelect(season)}
              className="w-48 h-24 rounded-2xl border-2 border-green-500 bg-white/10 hover:bg-white/20 hover:scale-105 transition text-white font-medium text-lg shadow-md"
            >
              {season} Season <br />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}