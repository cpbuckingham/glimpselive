'use strict'

// Express
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

//db
// const knex = require('./db/knex');
const environment = process.env.NODE_ENV || 'development';
const config = require('./knexfile.js')[environment];
const knex = require('knex')(config);

// Middlewares
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const methodOverride = require('method-override');

// Routes
const users = require('./routes/users');
const auth = require('./routes/auth');
const posts = require('./routes/posts');
const about = require('./routes/about');
const blog = require('./routes/blog');
const messages = require('./routes/messages');
const buddies = require('./routes/buddies');


// Use Middlewares
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieSession({
  secret: "buttsncheeks",
}))
app.use(require('flash')());

// Use Routes
app.use('/users', users);
app.use('/auth', auth);
app.use('/posts', posts);
app.use('/about', about);
app.use('/blog', blog);
app.use('/messages', messages);
app.use('/buddies', buddies);

app.listen(port, function () {
  console.log('hello from', port);
});

module.exports = app;
