const express = require('express')
const exphbs = require("express-handlebars")
const mysql = require("mysql")

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

const conn = mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'',
        database:'nodemysql'
    }
)

conn.connect(function(err){
    if (err) {
        console.log(err)
    }
    console.log("Conectou ao MySQL")

    app.listen(3000)
})