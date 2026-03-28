require('dotenv').config();
const mongoose = require("mongoose");
const Pesticide = require("./models/Pesticide"); 
const Crop = require("./models/Crop");           


const bajraPesticideData = [
  {
    "Name": "Malathion",
    "Active Ingredients": "Malathion 50% EC",
    "Application Method": "Spray",
    "Target Species": "Aphids, cucumber beetles, whiteflies",
    "Safety Precautions": [
      "Wear protective gloves and goggles.",
      "Avoid inhalation and skin contact.",
      "Do not spray near water bodies."
    ],
    "Environmental Impact": {
      "Soil": "Moderate",
      "Water": "High",
      "Wildlife": "Moderate",
      "Beneficial Insects": "High"
    },
    "Usage Instructions": [
      "Apply 1.5-2 ml per liter of water.",
      "Spray at early sign of pest infestation.",
      "Repeat application after 10-15 days if needed."
    ],
    "Advantages": [
      "Broad-spectrum insecticide.",
      "Effective on soft-bodied insects."
    ],
    "Disadvantages": [
      "Harmful to pollinators.",
      "Short residual activity."
    ]
  },
  {
    "Name": "Neem Oil",
    "Active Ingredients": "Azadirachtin 0.3-0.5%",
    "Application Method": "Spray",
    "Target Species": "Aphids, whiteflies, spider mites",
    "Safety Precautions": [
      "Wear gloves during application.",
      "Avoid eye contact.",
      "Considered safe for environment."
    ],
    "Environmental Impact": {
      "Soil": "Low",
      "Water": "Low",
      "Wildlife": "Low",
      "Beneficial Insects": "Low"
    },
    "Usage Instructions": [
      "Apply 2-3 ml per liter water.",
      "Spray every 7-10 days.",
      "Can be used during flowering."
    ],
    "Advantages": [
      "Eco-friendly and biodegradable.",
      "Reduces pest growth and reproduction."
    ],
    "Disadvantages": [
      "Slower pest control action.",
      "Requires multiple applications."
    ]
  },
  {
    "Name": "Imidacloprid",
    "Active Ingredients": "Imidacloprid 17.8% SL",
    "Application Method": "Spray",
    "Target Species": "Aphids, whiteflies, cucumber beetles",
    "Safety Precautions": [
      "Wear gloves and mask.",
      "Avoid skin and eye contact.",
      "Keep away from bees."
    ],
    "Environmental Impact": {
      "Soil": "Moderate",
      "Water": "High",
      "Wildlife": "High",
      "Beneficial Insects": "High"
    },
    "Usage Instructions": [
      "Apply 0.3-0.5 ml per liter of water.",
      "Spray during early infestation.",
      "Repeat after 10-14 days if necessary."
    ],
    "Advantages": [
      "Systemic insecticide.",
      "Effective against sucking pests."
    ],
    "Disadvantages": [
      "Highly toxic to bees.",
      "Risk of resistance development."
    ]
  },
  {
    "Name": "Spinosad",
    "Active Ingredients": "Spinosad 45 SC",
    "Application Method": "Spray",
    "Target Species": "Thrips, cucumber beetles, leaf miners",
    "Safety Precautions": [
      "Wear protective gloves and mask.",
      "Avoid inhalation.",
      "Do not contaminate water bodies."
    ],
    "Environmental Impact": {
      "Soil": "Low",
      "Water": "Moderate",
      "Wildlife": "Low",
      "Beneficial Insects": "Moderate"
    },
    "Usage Instructions": [
      "Apply 0.5-1 ml per liter of water.",
      "Spray when pests appear.",
      "Repeat after 7-10 days if needed."
    ],
    "Advantages": [
      "Effective on resistant pests.",
      "Low mammalian toxicity."
    ],
    "Disadvantages": [
      "Moderate toxicity to beneficial insects.",
      "Needs careful handling."
    ]
  },
  {
    "Name": "Bifenthrin",
    "Active Ingredients": "Bifenthrin 10% EC",
    "Application Method": "Spray",
    "Target Species": "Spider mites, cucumber beetles, aphids",
    "Safety Precautions": [
      "Wear protective clothing.",
      "Avoid skin and eye contact.",
      "Do not spray near water bodies."
    ],
    "Environmental Impact": {
      "Soil": "Moderate",
      "Water": "High",
      "Wildlife": "High",
      "Beneficial Insects": "High"
    },
    "Usage Instructions": [
      "Apply 1 ml per liter of water.",
      "Spray at early infestation.",
      "Repeat every 10 days if required."
    ],
    "Advantages": [
      "Fast-acting pyrethroid insecticide.",
      "Effective on many pests."
    ],
    "Disadvantages": [
      "Highly toxic to aquatic life.",
      "Short residual action."
    ]
  },
  {
    "Name": "Carbaryl",
    "Active Ingredients": "Carbaryl 50% WP",
    "Application Method": "Spray",
    "Target Species": "Aphids, beetles, cucumber moth",
    "Safety Precautions": [
      "Wear gloves and mask.",
      "Avoid contact with skin and eyes.",
      "Do not spray in windy conditions."
    ],
    "Environmental Impact": {
      "Soil": "Moderate",
      "Water": "High",
      "Wildlife": "Moderate",
      "Beneficial Insects": "High"
    },
    "Usage Instructions": [
      "Apply 2 g per liter of water.",
      "Spray during early infestation.",
      "Repeat after 10-14 days if necessary."
    ],
    "Advantages": [
      "Broad-spectrum insecticide.",
      "Good knockdown effect."
    ],
    "Disadvantages": [
      "Toxic to bees and aquatic life.",
      "May cause resistance with frequent use."
    ]
  },
  {
    "Name": "Abamectin",
    "Active Ingredients": "Abamectin 1.8% EC",
    "Application Method": "Spray",
    "Target Species": "Spider mites, thrips",
    "Safety Precautions": [
      "Wear gloves and mask.",
      "Avoid inhalation and skin contact.",
      "Keep children and animals away."
    ],
    "Environmental Impact": {
      "Soil": "Low",
      "Water": "Moderate",
      "Wildlife": "Low",
      "Beneficial Insects": "Low"
    },
    "Usage Instructions": [
      "Apply 0.5 ml per liter of water.",
      "Spray at early infestation.",
      "Repeat after 10-12 days if needed."
    ],
    "Advantages": [
      "Effective against mites and thrips.",
      "Low toxicity to mammals."
    ],
    "Disadvantages": [
      "Requires careful handling.",
      "Can affect beneficial mites."
    ]
  },
  {
    "Name": "Thiamethoxam",
    "Active Ingredients": "Thiamethoxam 25% WG",
    "Application Method": "Spray",
    "Target Species": "Aphids, whiteflies",
    "Safety Precautions": [
      "Wear gloves and mask.",
      "Avoid contact with eyes and skin.",
      "Do not spray near water bodies."
    ],
    "Environmental Impact": {
      "Soil": "Moderate",
      "Water": "High",
      "Wildlife": "High",
      "Beneficial Insects": "High"
    },
    "Usage Instructions": [
      "Apply 0.5 g per liter of water.",
      "Spray at early infestation.",
      "Repeat after 10-14 days if necessary."
    ],
    "Advantages": [
      "Systemic insecticide.",
      "Controls a wide range of sucking pests."
    ],
    "Disadvantages": [
      "Highly toxic to bees.",
      "Environmental persistence."
    ]
  }
]





async function linkPigeonPeaPesticidesToCrop() {
  await mongoose.connect(process.env.MONGO_URL);

  const seasonName = "Zaid";
  const cropName = "Cucumber";

  try {
    // Find the Crop document for the Kharif season
    const seasonDoc = await Crop.findOne({ season: seasonName });
    if (!seasonDoc) throw new Error(`Season "${seasonName}" document not found.`);

    // Find the crop subdocument inside crops array by name
    const cropSubdoc = seasonDoc.crops.find(c => c.name === cropName);
    if (!cropSubdoc) throw new Error(`Crop "${cropName}" not found inside season "${seasonName}".`);

    const cropId = cropSubdoc._id;

    for (const pesticideData of bajraPesticideData) {
      // Check if pesticide already exists
      let pesticideDoc = await Pesticide.findOne({ Name: pesticideData.Name });

      if (pesticideDoc) {
        // Link crop if not linked already
        if (!pesticideDoc.crop || !pesticideDoc.crop.equals(cropId)) {
          pesticideDoc.crop = cropId;
          await pesticideDoc.save();
          console.log(`🔗 Linked existing pesticide "${pesticideData.Name}" to crop.`);
        } else {
          console.log(`✔️ Pesticide "${pesticideData.Name}" already linked to crop.`);
        }
      } else {
        // Create new pesticide and link crop
        pesticideDoc = new Pesticide({
          ...pesticideData,
          crop: cropId
        });
        await pesticideDoc.save();
        console.log(`➕ Created and linked pesticide "${pesticideData.Name}"`);
      }

      // Add pesticide ref to cropSubdoc.pesticides array if not already included
      if (!cropSubdoc.pesticides) {
        cropSubdoc.pesticides = [];
      }
      if (!cropSubdoc.pesticides.includes(pesticideDoc._id)) {
        cropSubdoc.pesticides.push(pesticideDoc._id);
      }
    }

    // Save the updated season document (which includes updated crops array)
    await seasonDoc.save();

    console.log(`✅ Finished linking pesticides for crop "${cropName}" in season "${seasonName}".`);
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    mongoose.connection.close();
  }
}

linkPigeonPeaPesticidesToCrop();
