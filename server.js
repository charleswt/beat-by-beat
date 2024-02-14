const path = require('path');
const express = require('express');
//const exphbs = require('express-handlebars'); //commented out untill can get functioning
//const routes = require('./controllers');
//const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
require('dotenv').config();
const fetch = require('node-fetch');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3001;

//server session with crypto
const secretCrypto = crypto.randomBytes(12).toString('hex');
const sess = {
  secret: secretCrypto,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, //1 day
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
console.log(secretCrypto);

app.use(session(sess));

//commented out untill can get functioning
// Create the Handlebars.js engine object with custom helper functions
//const hbs = exphbs.create({ helpers });

// Inform Express.js which template engine we're using
//app.engine('handlebars', hbs.engine);
//app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//fetch artist data from AudioDB
app.get('/searchArtist', async (req, res) => {
  const artistName = req.query.artist;
  const apiKey = process.env.API;
  const apiUrl = `https://www.theaudiodb.com/api/v1/json/${apiKey}/search.php?s=${artistName}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Server error');
  }
});

//fetch music videos
app.get('/fetchMusicVideos', async (req, res) => {
  const artistId = req.query.artistId;
  const apiKey = process.env.API;
  const apiUrl = `https://www.theaudiodb.com/api/v1/json/${apiKey}/mvid.php?i=${artistId}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

//fetch musicbrainz data
app.get('/getMusicBrainzData', async (req, res) => {
  const mbId = req.query.mbId;
  const apiUrl = `https://musicbrainz.org/ws/2/artist/${mbId}?fmt=json&inc=url-rels+release-groups`;

  try {
    const response = await fetch(apiUrl, {
      headers: { 'User-Agent': 'YourAppName/1.0.0 ( YourEmail@example.com )' },
    });
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

//commented out untill can get functioning
//app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
