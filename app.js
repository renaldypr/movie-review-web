const express = require('express');
const app = express();
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

const router = require('./routes');

app.use('/', router)

app.listen(3000, () => {
  console.log('listening on port 3000!')
})