const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const exphbars = require('express-handlebars');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;
//how long the session is before it times out
const sesh = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge:1000*60*60*2
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};
//middleware
app.use(express.static("public"))

const handleBars = exphbars.create({});
app.engine('handlebars', handleBars.engine);
app.set('view engine', 'handlebars');
//middleware
app.use(session(sesh));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Listening Now on port ' + PORT));
});
