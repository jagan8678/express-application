const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 3001;

mongoose.connect('mongodb+srv://test:test@cluster0.wiecoxl.mongodb.net/database?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

app.use(bodyParser.json());
app.use('/', userRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

