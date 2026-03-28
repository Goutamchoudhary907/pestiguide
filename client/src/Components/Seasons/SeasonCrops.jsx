import { useEffect, useState } from "react";
import kharifimg from '../../assets/kharif.jpg';
import Footer from "../Footer/Footer.jsx";
import ANavbar from "../Navbar/ANavbar.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import RiceImg from "../../assets/RiceImg.jpg"
import axios from "axios";
import maizeimg from '../../assets/maize.jpeg';
import jowar from '../../assets/maize.jpeg';
import soyabean from '../../assets/soybean.jpg';
import moong from '../../assets/moong.jpeg';
import linseed from '../../assets/linssed.jpeg';
import mustard from '../../assets/mustard green.jpg';
import peas from '../../assets/peas.jpeg';
import sunflower from '../../assets/sunfower.jpg';
import tur from '../../assets/tur.jpeg';
import urad from '../../assets/urad.jpg';
import wheat from '../../assets/wheat.jpeg';

const cropImages = {
  Rice: RiceImg,
  Maize: maizeimg,
  Jowar: jowar,
  "Bajra/PearlMillet": linseed,
  "Tur/Arhar/PigeonPea":tur,
  "Moong/GreenGram": moong,
  "Urad/BlackGram": urad,
  Soybean: soyabean,
  Groundnut: peas,
  Cotton:mustard,
  Sunflower:sunflower,
  "Sesamum/Til": wheat
};

export default function SeasonCrops() {
    const [search, setSearch] = useState("");
    const [crops, setCrops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const selectedSeason = queryParams.get('season'); 
   
    const navigate = useNavigate();
    
    const handleSeasonChange = (season) => {
      navigate(`/crops?season=${season}`);
    };

    const handleCropSelect = (cropName) => {
      if (!cropName) {
        console.error("No crop name provided");
        return;
      }
      navigate(`/pests?crop=${encodeURIComponent(cropName)}`);
    };

    useEffect(() => {
        const fetchCrops = async () => {
          setLoading(true);
          setError(null);
          try {
            const response = await axios.get(
              `http://localhost:3000/crops?season=${selectedSeason}`
            );
            console.log("Crops fetched:", response.data);
            setCrops(response.data);
          } catch (err) {
            setError(err);
            console.error("Error fetching crops:", err);
          } finally {
            setLoading(false);
          }
        };
    
        if (selectedSeason) {
          fetchCrops();
        } else {
          setLoading(false);
        }
      }, [ location.search]);
    
      const filteredCrops = crops.filter((crop) =>
        crop.name && crop.name.toLowerCase().includes(search.toLowerCase())
      );
    
      if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading crops for {selectedSeason} season...</div>;
      }
    
      if (error) {
        return <div className="text-center text-red-600">Error loading crops: {error.message}</div>;
      }
    
     return ( 
  <div className="min-h-screen text-black dark:text-gray-200 bg-white dark:bg-gray-900">
    <ANavbar />
    
    {/* Top section with season title, buttons and search */}
    <div className="w-full bg-green-300 dark:bg-green-800 h-56 mt-18">
      <h1 className="relative left-36 top-4 text-2xl font-bold">{selectedSeason} Season</h1>
      <div className="relative left-36 top-6 flex gap-8">
        {["Kharif", "Rabi", "Zaid"].map(season => (
          <button
            key={season}
            onClick={() => handleSeasonChange(season)}
            className="px-6 py-2 rounded-full bg-white/80 hover:bg-white text-gray-800 transition shadow-md"
          >
            {season} Season
          </button>
        ))}
      </div>
      <input 
        className="relative left-36 top-10 w-[600px] max-w-[90%] px-4 py-2 text-xl border border-gray-300 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-green-400"
        placeholder="Search crops..." 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
      />
    </div>

    {/* Crop cards grid */}
    <div className="w-full px-6 py-12 flex flex-wrap gap-8 justify-center">
      {filteredCrops.map((crop) => (
        <div key={crop._id} className="w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md hover:shadow-xl transition-transform hover:scale-105 overflow-hidden">
          <img
            src={cropImages[crop.name] || kharifimg}
            alt={crop.name}
            className="w-full h-40 object-cover"
          />
          <div className="p-4 text-center">
            <h3 className="text-xl font-semibold mb-3">{crop.name}</h3>
            <button
              onClick={() => handleCropSelect(crop.name)}
              className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full transition"
            >
              Select
            </button>
          </div>
        </div>
      ))}
    </div>

    <Footer />
  </div>
);
}