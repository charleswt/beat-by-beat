const path = require('path');
const express = require('express');
//const exphbs = require('express-handlebars');
//const routes = require('./controllers');
//const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3001;

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

// Create the Handlebars.js engine object with custom helper functions
//const hbs = exphbs.create({ helpers });

// Inform Express.js which template engine we're using
//app.engine('handlebars', hbs.engine);
//app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
