const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (_, res) => {
    res.status(200).sendFile( path.join(__dirname, '..', 'public', 'fileUpload', 'index.html') );
});

module.exports = router;
