const path = require('path');
const fs = require('fs/promises');
const express = require('express');
const multer = require('multer');
const { generatePIN,checkPINExists } = require('../utils/generatePIN');

const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'uploads'));
    },
    filename: (req, file, cb) => {
        generatePIN().then(pin => {
            console.log(pin)
            cb(null, `${Date.now()}---${pin}---${file.originalname}`);
        })
    }
})

const upload = multer({
    storage: diskStorage,
    limits: {
        fileSize: 100 * 1024 * 1024
    }
})

const router = express.Router();

router.post('/upload', upload.single('file'), async (req, res) => {
    res.status(200).json({message: "File upload successful"});
});

router.post('/download', async (req, res) => {
    try{
        const { filePIN } = req.body;
        
        if (await checkPINExists(filePIN)){
            const files = await fs.readdir(path.join(__dirname, '..', 'uploads'), {encoding: 'utf8'});
            const myFile = files.filter(item => {return item.split('---')[1] === filePIN})[0];
            return res.status(200).sendFile(path.join(__dirname, '..', 'uploads', myFile));
        }else{
            return res.status(404).json({message: "File with this PIN code was not found"});
        }
    }catch(error){
        return res.status(500).json({message: error.message});
    }
});

module.exports = router;
