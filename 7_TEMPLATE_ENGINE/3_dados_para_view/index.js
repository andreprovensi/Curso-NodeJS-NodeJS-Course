const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/', (req,res)=>{
    
    const user = {
        name:"Andre",
        surname:'Provensi',
        age:30
    }

    const nonObjectVariable = 'nonObject'
    res.render('home',{user:user,nonObjectVariable,layout:'main'})
})

app.listen(3000,()=>{console.log("App rodando da porta 3000")})