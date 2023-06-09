// server.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/phonebook', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

// Set up middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));


const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

// Start the server
const port = 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
