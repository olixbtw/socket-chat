const settings = require('./settings.json')
const socket = require('socket.io');
const express = require('express')
const cors = require('cors')
const app = express();
app.use(cors())

//create server and serve frontend part
app.use('/', express.static(settings.appDir))

const server = app.listen(settings.port.server, () =>
  console.log(`server started at port - ${settings.port.server}`)
)

//socket connection
let io = socket(server);
let socketHandle = require('./socket');
io.on('connection', socketHandle(io))

//example for requests (for authorisation later)
app.use('/api', require('./routes/users'))


