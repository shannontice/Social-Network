const express = require('express');
const db = require('./config/connection')
const app= express();
const PORT = process.env.PORT || 8080;

// Import routes
const user_routes = require('./routes/user_routes');
const thought_routes = require('./routes/thought_routes');

// Open Middleware
app.use(express.json());

// Load Routes
app.use('/api', user_routes, thought_routes)

db.on('open', () => {
    app.listen(PORT, () => console.log('Server started on', PORT))
})


