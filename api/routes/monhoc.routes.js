var express = require('express')
var router = express.Router()
var MonHocController = require('../controllers/monhoc.controller')

router.get('/', MonHocController.getMonHoc)
router.post('/', MonHocController.createMonHoc)

module.exports = router
