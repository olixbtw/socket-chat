let express = require('express')
let router = express.Router()

let users = require('./../data/users.json')

router.get('/users', (req, res) => {
  res.send(users)
})
router.get('/users/:id', (req, res) => {
  res.send(...users.filter(e => e.id == req.params.id))
})
router.post('/users', function (req, res) {
  let newUser = { id: Math.random(), name: req.body }
  users.push(newUser)

  res.send(users)
})

module.exports = router;