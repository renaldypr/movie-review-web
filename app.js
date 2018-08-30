const express = require('express');
const session = require('express-session');
const app = express();
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}));
app.use(express.json());
// app.use(session({
//   secret: 'krunal',
//   resave: false,
//   saveUninitialized: true
// }))

const router = require('./routes');

app.use('/', router)

app.listen(3000, () => {
  console.log('listening on port 3000!')
})