require('dotenv').config();
const path = require('path')
const express = require('express');
const multer = require('multer');

const app = express();
const upload = multer({dest: "uploads/"})

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', require('./routes/pageRouter'));

app.listen(PORT)
