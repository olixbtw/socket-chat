var express = require('express')
var app = express();
const settings = require('./settings.json')

//create server and serve frontend part
app.listen(settings.port, () => console.log(`server started at port - ${settings.port}`))
app.use('/', express.static(settings.app))

//example for requests (for authorisation later)
app.use('/api', require('./routes/users'))
