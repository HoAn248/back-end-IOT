var express = require('express')
var router = express.Router()
var DiemDanhController = require('../controllers/diemdanh.controller')

router.post('/', DiemDanhController.createDiemDanh)
router.post('/update', DiemDanhController.updateDiemDanh)
router.get('/:id', DiemDanhController.getDiemDanh)
router.get('/', DiemDanhController.getAllDiemDanh)
router.post('/history', DiemDanhController.PostHistory)
router.post('/sinhvien', DiemDanhController.getDiemDanhId)

module.exports = router
