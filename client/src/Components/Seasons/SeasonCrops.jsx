import { useEffect, useState } from "react";
import kharifimg from '../../assets/kharif.jpg';
import Footer from "../Footer/Footer.jsx";
import ANavbar from "../Navbar/AuthNavbar.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import RiceImg from "../../assets/RiceImg.jpg"
import axios from "axios";
import maizeimg from '../../assets/maize.jpeg';
import soyabean from '../../assets/soyabean.png';
import moong from '../../assets/moong.jpeg';
// import linseed from '../../assets/linssed.jpeg';
import peas from '../../assets/peas.png';
import sunflower from '../../assets/sunfower.jpg';
import tur from '../../assets/tur.jpeg';
import urad from '../../assets/urad.jpg';
import wheat from '../../assets/wheat.jpeg';
import sesamum from '../../assets/sesamum.png'
import barley from '../../assets/barley.png'
import chana from '../../assets/chana.png'
import masoor from '../../assets/masoor.png'  
import mustard from '../../assets/mustard.png'
import mustardGreens from '../../assets/mustardGreens.png'
import linseed from '../../assets/linseed.png'
import sugarcane from '../../assets/sugarcane.png'
import watermelon from '../../assets/watermelon.png'
import cucumber from '../../assets/cucumber.png'
import jowar from '../../assets/jowar.png'
import api from '../../api/axios.js';
const cropImages = {
  Rice: RiceImg,
  Maize: maizeimg,
  "Bajra/PearlMillet": linseed,
  "Tur/Arhar/PigeonPea":tur,
  "Moong/GreenGram": moong,
  "Urad/BlackGram": urad,
  Soybean: soyabean,
  Groundnut: peas,
  Cotton:mustard,
  Sunflower:sunflower,
  "Sesamum/Til": sesamum ,
  Wheat:wheat,
  Barley:barley,
  "Gram/Chana":chana ,
  "Masoor/Lentil" :masoor ,
  Mustard: mustard ,
  "Linseed/Alsi" :linseed ,
  Peas:peas ,
  Sugarcane:sugarcane,
  Watermelon:watermelon ,
  Cucumber:cucumber ,
  "Jowar/Sorghum":jowar,
  "MustardGreens/Sarson" :mustardGreens
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
            const response = await api.get(
              `/crops?season=${selectedSeason}`
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

    {/* Top section – responsive */}
    <div className="w-full bg-green-300 dark:bg-green-800 py-6 px-4 mt-18">
      <div className="max-w-5xl mx-auto text-center md:text-left">
        <h1 className="text-2xl font-bold">{selectedSeason} Season</h1>
        <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
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
          className="w-full max-w-xl mx-auto md:mx-0 mt-6 px-4 py-2 text-lg border border-gray-300 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Search crops..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
        />
      </div>
    </div>

    {/* Crop cards grid */}
    <div className="w-full px-4 py-12 flex flex-wrap gap-8 justify-center">
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