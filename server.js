const express = require('express')
const server = express()
const nunjucks = require('nunjucks') //permite usar variaveis, funcoes, etc no html
const Pool = require('pg').Pool //pool mantem a conexão com o banco ativa sem precisar conectr e desconectar toda hora

server.use(express.static('public'))

server.use(express.urlencoded({ extended: true })) //habilita o body do formulário

const db = new Pool({
    user: 'postgres',
    password: '12345',
    host: 'localhost',
    port: 5432,
    database: 'doe'
})

nunjucks.configure('./', {
    express: server,
    noCache: true //força a atualização do array donors ao invés de armazená-lo em cache
})

server.get('/', function(req, res) {
    db.query('SELECT * FROM donors', function(err, result) {
        if (err) res.send("Erro de banco de dados")

        const donors = result.rows
        
        return res.render('index.html', { donors })
    })
})

server.post('/', function(req, res) {
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    if (name == "" || email == "" || blood == "") {
        return res.send('Todos os campos são obrigatórios')
    }

    const query = `
        INSERT INTO donors ("name", "email", "blood") 
        VALUES ($1, $2, $3)
    ` //$ é a mesma coisa que name, email e blood do values

    const values = [name, email, blood]

    db.query(query, values, function(err) {
        if (err) return res.send("Erro no banco de dados")
        
        return res.redirect('/') 
    })    
})

server.listen(3000)