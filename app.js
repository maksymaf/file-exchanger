require('dotenv').config();
const path = require('path')
const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: false}));
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', require('./routes/pageRouter'));
app.use('/api', require('./routes/apiFileRouter'));

app.listen(PORT)
