var express = require('express')
var router = express.Router()
var LopController = require('../controllers/lop.controller')

router.get('/', LopController.getLop)
router.post('/', LopController.createLop)

module.exports = router
