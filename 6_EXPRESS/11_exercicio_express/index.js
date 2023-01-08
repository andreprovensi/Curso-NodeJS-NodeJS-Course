const express = require('express')
const path = require('path')

const basePath = path.join(__dirname,'templates') 
const port = 5000

const app = express()

const loginRouter = require('./routes/login')
const usersRouter = require('./routes/users')


app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(loginRouter)
app.use(usersRouter)


app.get('/', (req,res)=>{
    res.sendFile(`${basePath}/index.html`)
})

app.listen(port,()=>console.log(`App rodando na porta ${port}`))