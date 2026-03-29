const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const { initializeCronJobs } = require('./services/cronJob.js');
initializeCronJobs();
const app = express();
app.use(cors());
app.use(express.json());
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.error("MongoDB Error ❌", err));

  app.get('/health', (req, res) => res.send('OK'));
const authRoutes = require('./routes/auth');
app.use("/auth", authRoutes);

const cropsRoute = require('./routes/getCrops');
app.use("/", cropsRoute); 
const pestsRoute = require('./routes/getPests'); 
app.use('/api/pests', pestsRoute);

const pesticideDetail = require('./routes/getPesticideDetail');
app.use('/api/pesticides', pesticideDetail);

app.listen(3000, () => console.log("Server running on port 3000"));
