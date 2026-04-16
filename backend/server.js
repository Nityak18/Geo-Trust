require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');

const app = express();
app.use(cors());
app.use(express.json());

// Set up basic mock MongoDB connection to satisfy prompt
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/chaindeed')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const upload = multer({ dest: 'uploads/' });

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'ChainDeed Backend API is running' });
});

// Mock Auth
app.post('/api/admin/login', (req, res) => {
  res.json({ token: 'mock-jwt-token-for-admin' });
});

// Mock properties upload/metadata
app.post('/api/metadata/upload', upload.single('document'), (req, res) => {
  res.json({ success: true, cid: 'QmYwAPJzv5... (Mocked)' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
