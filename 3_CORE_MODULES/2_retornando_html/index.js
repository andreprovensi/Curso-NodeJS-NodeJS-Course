const http = require('http');

const port = 3000

const server = http.createServer(

    (req,res)=>{
        res.write('Olá Node')
        res.end()
    }
)


server.listen(port)


