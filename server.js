const express = require('express')
const app = express()
var cors = require('cors')
const port = 3000
var mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mypost'
})

// connection.connect()

// connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
//     if (err) throw err

//     console.log('The solution is: ', rows[0].solution)
// })

// connection.end()
var list = []
app.use(cors())
app.post('/get-data/:id', function(req, res) {
    let id = req.params.id;
    for (let i = 0; i < list.length; ++i) {
        if (id == list[i].id)
            res.send(list[i])
    }
})
app.post('/update/:id', function(req, res) {
    req.on('data', function(data) {
        let datai = JSON.parse(data);
        for (let i = 0; i < list.length; ++i) {
            if (datai.id == list[i].id)
                list[i] = { id: datai.id, title: datai.title, content: datai.content }
        }
    })
    res.send("updated")

})
app.put('/create', function(req, res) {
    req.on('data', function(datas) {
        let data = JSON.parse(datas)

        let title = data.title
        let content = data.content
        connection.connect()
        let statement = `INSERT INTO tblpost(Title, Content) VALUES ('${title}','${content}')`
        connection.query(statement, function(err) {
            if (err) throw err
        })
        connection.end()

    })
    res.send("saved")
})

app.get('/get-data/all', function(req, res) {
    connection.connect()
    let statement = `SELECT * FROM tblpost WHERE 1`
    connection.query(statement, function(err, result, fields) {
        if (err) throw err
        console.log(result);
    })
    connection.end()
    res.send(list)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))