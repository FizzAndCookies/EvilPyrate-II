const express = require('express');
const router = express.Router();


router.get('/exe',(req,res)=>{
    res.send("hello this is main page")
});

module.exports = router;