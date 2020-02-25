var express = require('express')
var app = express();
const settings = require('./settings.json')

app.listen(settings.port, () => console.log(`server started at port - ${settings.port}`))

app.use(express.static(settings.app))
