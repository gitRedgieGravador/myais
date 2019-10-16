const express = require('express')
const app = express()
var cors = require('cors')
const port = 3000

var list = []
app.use(cors())
app.post('/get-data/:id', function(req, res){
    var id = req.params.id;
    for(let i = 0; i < list.length; ++i){
        if(id == list[i].id)
        res.send(list[i])
    }
})

app.put('/create', function(req, res){
    req.on('data', function(datas){
        let data = JSON.parse(datas)
        list.push({id: list.length + 1, title: data.title, content: data.content})
        console.log(data)
    })
    res.send("saved")
})

app.get('/get-data/all', function(req, res){
    res.send(list)
    console.log( "data all"+list)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))