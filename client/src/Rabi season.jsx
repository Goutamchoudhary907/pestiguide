
import { useState } from "react";
import './Rabi season.css';
// import kharifimg from './kharif.jpg';
import Footer from "./Components/Footer/Footer.jsx";
import ANavbar from "./Components/Navbar/ANavbar.jsx";

const crops = [ 
    { name: "Rice", scientific: "Oryza sativa", duration: "120-150 days", region: "Eastern", image: "" }, 
    { name: "Cotton", scientific: "Gossypium", duration: "150-180 days", region: "Central", image: "" }, 
    { name: "Maize", scientific: "Zea mays", duration: "85-95 days", region: "Northern", image: "" }, 
    { name: "Soybean", scientific: "Glycine max", duration: "100-120 days", region: "Central", image: "" }, 
    { name: "Groundnut", scientific: "Arachis hypogaea", duration: "124-130 days", region: "Southern", image: "" }, 
    { name: "Green Gram", scientific: "Vigna radiata", duration: "65-70 days", region: "Western", image: "" }, 
    { name: "Sugarcane", scientific: "Saccharum officinarum", duration: "12-18 months", region: "Tropical", image: "" }, 
    { name: "Black Gram", scientific: "Vigna mungo", duration: "70-75 days", region: "Central", image: "" }, 
];

export default function Rabi() { const [search, setSearch] = useState(""); 
    const filteredCrops = crops.filter((crop) => crop.name.toLowerCase().includes(search.toLowerCase()));

return ( 
    
<div className="global">
    <ANavbar />
    <div className="above">
    <h1 >Rabi Season</h1>
    <br />
    <p>Rabi crops are sown around mid-November, preferably after the monsoon rains are over, and harvesting begins in April / May. The crops are grown either with rainwater that has percolated into the ground or using irrigation. Good rain in winter spoils rabi crops but is good for kharif crops. The major rabi crop in India is wheat, followed by barley, mustard, sesame and peas. Peas are harvested early, as they are ready early: Indian markets are flooded with green peas from January to March, peaking in February. Many crops are cultivated in both kharif and rabi seasons. The crops produced in India are seasonal and highly dependent on these two monsoons. The table below contains a list of differences between the three cropping seasons in India.</p>
    {/* <img src={Rabiimg} alt="" id="Rabiimg" /> */}
    <br /><br /> 
    <input 
    className="searchbox"
    placeholder="Search crops..." 
    value={search} 
    onChange={(e) => setSearch(e.target.value)} />
    </div> 
     
    <br /><br />
    <div className="local"> 
        {
        filteredCrops.map((crop, index) => ( 
            <div key={index}> 
            <div className="card"> 
                <h3 >{crop.name}</h3> 
                <p>{crop.scientific}</p> 
                <p >Duration: {crop.duration}</p> 
                <p >Suitable for {crop.region} Region</p> 
                <button >Select</button>
                </div> 
             </div> 
            ))}            
                </div>
                <div className="bottom">
                <br /><br />
                < Footer/>
                </div>
                </div> 
                ); 
                }

















