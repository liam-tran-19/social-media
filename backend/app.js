const feathers = require("@feathersjs/feathers");
const express = require("@feathersjs/express");
const socketio = require("@feathersjs/socketio");
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const config = require('./config');

// routes
const authRoutes = require('./routes/api/auth');
const userRoutes = require('./routes/api/users');
const statusRoutes = require('./routes/api/status')
const ChatModel = require('./models/Chat')

const { MONGO_DB_NAME } = config;

const app = express(feathers());
app.use(express.json());
app.configure(socketio());
app.configure(express.rest());

// CORS Middleware
app.use(cors());
// Logger Middleware
app.use(morgan('dev'));
// Bodyparser Middleware
app.use(bodyParser.json());

// Connect to Mongo
mongoose
  .connect(MONGO_DB_NAME, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

// Use Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/status', statusRoutes)
app.use('/api/chat', new ChatModel)

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// New connections connect to stream channel
app.on("connection", (conn) => app.channel("stream").join(conn));
// Publish events to stream
app.publish((data) => app.channel("stream"));

module.exports = app;
