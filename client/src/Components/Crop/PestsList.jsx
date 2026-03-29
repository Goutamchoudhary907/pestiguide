import React, { useEffect, useState } from "react";
import ANavbar from "../Navbar/AuthNavbar.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import img2 from '../../assets/FRAME2.png';
import img4 from '../../assets/test.jpg';
import api from '../../api/axios.js';

const pestImages = {
  "Mancozeb": img2,
};

const Card = ({ item, onClick }) => {
  const activeIngredients = item["Active Ingredients"] || "Not specified";
  const applicationMethod = item["Application Method"] || "Not specified";

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer"
      onClick={() => onClick(item)}
    >
      <div className="w-full h-40 bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden rounded-t-xl">
  <img
    src={item.imageUrl || pestImages[item.Name] || img4}
    alt={item.Name}
    className="w-full h-full object-contain"
  />
</div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {item.Name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
          <strong>Active Ingredients:</strong> {activeIngredients}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          <strong>Application:</strong> {applicationMethod}
        </p>
      </div>
    </div>
  );
};

export default function PestsList() {
  const [pests, setPests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPesticide, setSelectedPesticide] = useState(null);
  const [pesticideDetail, setPesticideDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const cropName = new URLSearchParams(location.search).get('crop');

  useEffect(() => {
    const fetchPests = async () => {
      try {
        const response = await api.get(
          `/api/pests?crop=${encodeURIComponent(cropName)}`
        );
        setPests(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Failed to fetch pests");
      } finally {
        setLoading(false);
      }
    };

    if (cropName) fetchPests();
  }, [cropName]);

  useEffect(() => {
    const fetchPesticideDetails = async () => {
      if (!selectedPesticide) return;

      try {
        setDetailLoading(true);
        const response = await api.get(
          `/api/pesticides/${selectedPesticide._id}`
        );
        setPesticideDetail(response.data);
        setDetailError(null);
        navigate(`/pesticide/${selectedPesticide._id}`);
      } catch (err) {
        setDetailError(err.response?.data?.message || err.message || "Failed to fetch pesticide details");
      } finally {
        setDetailLoading(false);
      }
    };

    fetchPesticideDetails();
  }, [selectedPesticide, navigate]);

  const handleCardClick = (pesticide) => {
    setSelectedPesticide(pesticide);
  };

  if (!cropName) return <div className="text-center text-red-600 mt-10">No crop specified</div>;
  if (loading) return <div className="text-center text-gray-600 dark:text-gray-400 mt-10">Loading pests for {cropName}...</div>;
  if (error) return <div className="text-center text-red-600 mt-10">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ANavbar />
      <div className="pt-24 px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
          Pesticides For - {cropName}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">
          Comprehensive guide for pest control and growth management
        </p>

        <div className="mt-8 bg-green-100 dark:bg-green-900/30 rounded-2xl p-6 w-full max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white text-center mb-8">
            Pest Management
          </h2>
          {pests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pests.map((pest, index) => (
                <Card key={index} item={pest} onClick={handleCardClick} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
              No pesticides found for this crop
            </p>
          )}
        </div>
      </div>
    </div>
  );
}