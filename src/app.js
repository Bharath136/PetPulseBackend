const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./database/connection'); // Ensure this points to the correct path

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json()); // Use built-in body-parser for JSON requests
app.use(cors()); // Enable CORS




// Use Routes
const userRoutes = require('./routes/userRoutes');
app.use('/user', userRoutes);

const petRoutes = require('./routes/petRoutes');
app.use('/pets', petRoutes);

const serviceProviderRoutes = require('./routes/serviceProviderRoutes');
app.use('/service-provider', serviceProviderRoutes);

const appointmentRoutes = require('./routes/appointmentRoutes');
app.use('/appointments', appointmentRoutes);



// Test Route
app.get('/', (req, res) => {
    res.send("Welcome to PetPulse API");
});

// Test Route
app.get('/hellow-get', (req, res) => {
    res.send("Welcome to PetPulse API");
});

// Connect to MongoDB
connectDB()


// 404 Route Handler for undefined routes
app.use((req, res) => {
    res.status(404).send("Route not found");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Socket.IO server running on http://localhost:${PORT}`);
});
