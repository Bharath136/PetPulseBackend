const connectDB = require('./database/connection');
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());


// Import Routes
const userRoutes = require('./routes/userRoutes');
app.use('/user', userRoutes);

// const postRoutes = require('./routes/postRoutes');
// app.use('/post', postRoutes);

// const commentRoutes = require('./routes/commentRoutes');
// app.use('/comments', commentRoutes);

// const followRoutes = require('./routes/followRoutes');
// app.use('/follow-user', followRoutes);


// Connect to MongoDB
connectDB();


// Use Routes
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
