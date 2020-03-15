const express = require('express')
const server = express()
const nunjucks = require('nunjucks') //permite usar variaveis, funcoes, etc no html

server.use(express.static('public'))

server.use(express.urlencoded({ extended: true })) //habilita o body do formulário

nunjucks.configure('./', {
    express: server,
    noCache: true //força a atualização do array donors ao invés de armazená-lo em cache
})

const donors = [
    {
        name: "Beatriz Januário",
        blood: "AB+"
    },
    {
        name: "Maria Silva",
        blood: "B+"
    },
    {
        name: "João Santos",
        blood: "A+"
    },
    {
        name: "Carla Oliveira",
        blood: "O+"
    }
]

server.get('/', function(req, res) {
    return res.render('index.html', { donors })
})

server.post('/', function(req, res) {
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    donors.push({
        name: name,
        blood: blood
    })

    return res.redirect('/')
})

server.listen(3000)