const express = require('express')
const sendMailer = require('../config/mailer')
const router = express.Router()
router.get('/',(req,res)=>{
    res.render('index')
})
router.get('/signin',(req,res)=>{
    res.render('signin')
})
router.get('/signup',(req,res)=>{
    res.render('signup')
})
router.get('/forget',(req,res)=>{
    res.render('sendotp')
})
router.get('/sendmail',(req,res)=>{
    res.render('forgetpass')
})
// router.get('/sendMail',(req,res)=>{
//     sendMailer()
// })
module.exports=router