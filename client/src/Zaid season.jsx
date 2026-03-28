
import { useState } from "react";
import './Zaid season.css';
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

export default function Zaid() { const [search, setSearch] = useState(""); 
    const filteredCrops = crops.filter((crop) => crop.name.toLowerCase().includes(search.toLowerCase()));

return ( 
    
<div className="global">
    <ANavbar />
    <div className="above">
    <h1 >Zaid Season</h1>
    <br />
    <p>Zaid crops are summer season crops. They grow for a short time period between Rabi and Kharif crops, mainly from March to June. These crops are mainly grown in the summer season during a period called the Zaid crop season. They require warm dry weather as major growth period and longer day length for flowering. Some summer months and rainy season is required. These crops also mature early. In between the Rabi and the Kharif seasons, there is a short season during the summer months known as the Zaid season. Some of the crops produced during Zaid season are watermelon, muskmelon, cucumber, vegetables and fodder crops. Sugarcane doesn’t require the need to fall into any season like rabi,etc. to be sown takes almost a year to grow.</p>
    {/* <img src={zaidimg} alt="" id="zaidimg" /> */}
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