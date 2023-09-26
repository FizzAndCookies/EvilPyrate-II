const express = require('express');
const router = express.Router();
const path = require('path');


//credentials
const F_username ="admin" //LOGIN USERNAME
const F_password = "password" //LOGIN PASSWORD

//login verify (POST)
router.post('/login',(req,res)=>{
    const { username, password } = req.body;
    console.log(username)
    if(username === F_username && password === F_password){
        req.session.auth = true
        res.redirect('/')

    }else{
        res.redirect('/login')
    }
});

// redirect to home or login page (if loggedIn = /home else /login)
router.get('/',(req,res)=>{
    if(req.session.auth===true){res.redirect('/home')}
    else{res.redirect('/login')}
});

//login route
router.get('/login',(req,res)=>{
    const loginFilePath = path.join(__dirname, '..', 'Public', 'login.html');
    res.sendFile(loginFilePath)
});

//home route
router.get('/home',(req,res)=>{
    const loginFilePath = path.join(__dirname, '..', 'Public', 'home.html');
    res.sendFile(loginFilePath)
});






module.exports = router;