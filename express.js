const express = require('express')
const app = express()
const port = 3000

app.get('/', function (req, res) {
    res.end("Hello, World!")

}) 

app.get('/users', function (req, res) {
    res.end("Getting users")

})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))