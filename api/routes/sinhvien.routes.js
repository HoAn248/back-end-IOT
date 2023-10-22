var express = require('express')
var router = express.Router()
var SinhVienController = require('../controllers/sinhvien.controller')

router.get('/all', SinhVienController.getAllSinhVien)
router.get('/:id', SinhVienController.getSinhVien)
router.post('/', SinhVienController.createSinhVien)
router.post('/update/:id', SinhVienController.updateSinhVien)
router.post('/delete/:id', SinhVienController.deleteSinhVien)
router.post('/clear/:id', SinhVienController.updateDiemDanh)

router.post('/checktoken', SinhVienController.checkToken)

router.post('/checkadmin', SinhVienController.checkAdmin)


router.post('/login', SinhVienController.login)
module.exports = router