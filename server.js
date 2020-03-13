const express = require('express')
const server = express()
const nunjucks = require('nunjucks') //permite usar variaveis, funcoes, etc no html

server.use(express.static('public'))

nunjucks.configure('./', {
    express: server
})

server.get('/', function(req, res) {
    return res.render('index.html')
})

server.listen(3000)