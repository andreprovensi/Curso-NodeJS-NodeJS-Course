const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/dashboard',(req,res)=>{
    res.render('dashboard')
})

app.get('/', (req,res)=>{
    
    const user = {
        name:"Andre",
        surname:'Provensi',
        age:30
    }

    const nonObjectVariable = 'nonObject'

    const auth = true

    res.render('home',{user:user,nonObjectVariable,auth})
})

app.listen(3000,()=>{console.log("App rodando da porta 3000")})