const express = require('express')

const path = require('path')

const basePath = path.join(__dirname, '../../templates')

const router = express.Router()




router.post('/users',(req,res)=>{
   const name = req.body.name
   const age = req.body.age
   res.sendFile(`${basePath}/users.html`)
   console.log(name,age)
   

})


module.exports = router