const express = require('express')

const path = require('path')

const basePath = path.join(__dirname, '../../templates')

const router = express.Router()

router.get('/login',(req,res)=>{
    res.sendFile(`${basePath}/login.html`)
})

module.exports = router