require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/chaindeed')
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// --- Schemas ---

const PropertySchema = new mongoose.Schema({
  surveyNo: String,
  location: String,
  area: String,
  type: String,
  status: { type: String, default: 'VERIFIED' },
  value: String,
  blockchainId: String,
  owner: String,
  block: String,
  hash: String,
  svgType: String,
  coords: [Number], // [lat, lng]
  timestamp: { type: Date, default: Date.now }
});

const TransactionSchema = new mongoose.Schema({
  hash: String,
  block: String,
  surveyNo: String,
  owner: String,
  value: String,
  time: String,
  status: String,
  landType: String,
  area: String,
  timestamp: { type: Date, default: Date.now }
});

const Property = mongoose.model('Property', PropertySchema);
const Transaction = mongoose.model('Transaction', TransactionSchema);

// --- Routes ---

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Geo-Trust Live API is operational' });
});

// Get all properties
app.get('/api/properties', async (req, res) => {
  try {
    const properties = await Property.find().sort({ timestamp: -1 });
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create/Seed properties (Initial setup)
app.post('/api/properties/seed', async (req, res) => {
  try {
    await Property.deleteMany({});
    const seedData = [
      {
        surveyNo: 'Survey No. 142',
        location: 'Belagavi, Karnataka',
        area: '2.4 Acres',
        type: 'Agricultural',
        status: 'VERIFIED',
        value: '₹48.2 Lakhs',
        blockchainId: 'KA-01-2847-0023',
        owner: '0x3a4...9f1b',
        block: '8,412',
        hash: '0xb412...88df',
        svgType: 'green_polygon',
        coords: [15.8497, 74.4977]
      },
      {
        surveyNo: 'Plot 77B',
        location: 'Pune Suburban, MH',
        area: '1,200 sq.ft',
        type: 'Residential',
        status: 'PENDING',
        value: '₹72.5 Lakhs',
        blockchainId: 'MH-04-1122-0077',
        owner: '0x1c9...2a34',
        block: 'Pending',
        hash: '0x... (mempool)',
        svgType: 'orange_floorplan',
        coords: [18.5204, 73.8567]
      }
    ];
    const created = await Property.insertMany(seedData);
    res.json(created);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all transactions
app.get('/api/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ timestamp: -1 }).limit(20);
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Execute Transfer (Live)
app.post('/api/transfer', async (req, res) => {
  try {
    const { property, transaction } = req.body;
    
    // 1. Create Transaction record
    const newTx = new Transaction(transaction);
    await newTx.save();

    // 2. Update or Create Property record
    const filter = { surveyNo: property.surveyNo };
    const update = { ...property };
    const options = { upsert: true, new: true };
    const updatedProperty = await Property.findOneAndUpdate(filter, update, options);

    res.json({ success: true, property: updatedProperty, transaction: newTx });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Geo-Trust API running on port ${PORT}`));
