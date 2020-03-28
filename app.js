const path = require('path')
const express = require('express')

const app = express()
app.use(express.static(__dirname));
const port = process.env.PORT || 3000

app.get('*', (req, res) => res.sendFile(__dirname+'/html.html'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
