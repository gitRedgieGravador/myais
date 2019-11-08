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
connection.connect(function(err) {
    if (err) {
        return console.error('error: ' + err.message);
    }

    console.log('Connected to the MySQL server.');
});

var list = []
app.use(cors())
app.post('/get-data/:id', function(req, res) {
    let id = req.params.id;
    let statement = `SELECT * FROM tblposts WHERE IDPost = ${id}`
    connection.query(statement, function(err, result, fields) {
        if (err) throw err
        let con = {
            IDPost: result[0].IDPost,
            Title: result[0].Title,
            Content: result[0].Content
        }
        res.send(con)
        console.log(con)
    })
})
app.post('/update/:id', function(req, res) {
    req.on('data', function(data) {
        let datai = JSON.parse(data);
        let id = req.params.id
        let query = `UPDATE tblposts SET Title='${datai.title}',Content='${datai.content}' WHERE IDPost = ${id}`
        connection.query(query, function(err, result, fields) {
            if (err) throw err
        })
    })
    res.send("updated")

})
app.put('/create', function(req, res) {
    req.on('data', function(datas) {
        let data = JSON.parse(datas)
        let title = data.title
        let content = data.content
            //let statement = `INSERT INTO tblPosts(Title, Content, Started) VALUES ([value-1],[value-2])`
        let statement = `INSERT INTO tblposts(Title, Content) VALUES ('${title}','${content}')`
        connection.query(statement, function(err) {
            if (err) throw err
        })
    })
    res.send("saved")
})

app.get('/get-data/all', function(req, res) {
    let statement = `SELECT * FROM tblposts WHERE 1`
    connection.query(statement, function(err, result, fields) {
        if (err) throw err
        var con = []
        for (let i = 0; i < result.length; ++i) {
            con.push({
                IDPost: result[i].IDPost,
                Title: result[i].Title,
                Content: result[i].Content,
                Stared: result[i].Stared,
                DateStamp: result[i].DateStamp
            })
        }
        res.send(con)
        console.log(con)
    })
})

app.delete('/delete/:id', function(req, res) {
    let statement = `DELETE FROM tblposts WHERE IDPost = ${req.params.id}`
    console.log("enter delete app")
    connection.query(statement, 1, (error, results, fields) => {
        if (error)
            return console.error(error.message);

        res.send(req.params.id)
    });
})

app.put('/star/:id', function(req, res) {
    console.log("star")
    let statement = `UPDATE tblposts SET Stared='${1}' WHERE IDPost='${req.params.id}'`
    connection.query(statement, (error) => {
        if (error) {
            console.log(error.message)
            res.send({
                status: false
            })
        } else {
            res.send({
                status: true
            })
        }
    });

})

app.post('/back', function(req, res) {
    let statement = `UPDATE tblposts SET Stared=false WHERE 1`
    connection.query(statement, (error) => {
        if (error) {
            console.log(error.message)
            res.send({
                status: false
            })
        } else {
            res.send({
                status: true
            })
        }
    });
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))