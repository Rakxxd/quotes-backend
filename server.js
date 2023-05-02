const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// initialize express app
const app = express();


// configure body-parser to parse request bodies
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// connect to MongoDB Atlas database
const MONGODB_URI = 'mongodb+srv://rakeshemperor:enOtpMrdwGHVazkJ@myquotescluster.evmkc3x.mongodb.net/quotes-db';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// define Quote schema
const quoteSchema = new mongoose.Schema({
  text: String,
  author: String,
});

// define Quote model
const Quote = mongoose.model('quotes', quoteSchema);

// define CRUD routes for Quotes
app.get('/quotes', async (req, res) => {
  const quotes = await Quote.find();
  res.json(quotes);
});

app.get('/quotes/:id', async (req, res) => {
  const quote = await Quote.findById(req.params.id);
  res.json(quote);
});

app.post('/quotes', async (req, res) => {
  const quote = new Quote(req.body);
  await quote.save();
  res.json(quote);
});

app.put('/quotes/:id', async (req, res) => {
  const quote = await Quote.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(quote);
});

app.delete('/quotes/:id', async (req, res) => {
  await Quote.findByIdAndRemove(req.params.id);
  res.sendStatus(204);
});

// start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
