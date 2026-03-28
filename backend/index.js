const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.error("MongoDB Error ❌", err));

const authRoutes = require('./routes/auth');
app.use("/auth", authRoutes);

const cropsRoute = require('./routes/getCrops');
app.use("/", cropsRoute); 
const pestsRoute = require('./routes/getPests'); 
app.use('/api/pests', pestsRoute);

const pesticideDetail = require('./routes/getPesticideDetail');
app.use('/api/pesticides', pesticideDetail);

app.listen(3000, () => console.log("Server running on port 3000"));
