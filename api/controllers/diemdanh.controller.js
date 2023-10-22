var DiemDanh = require('../models/diemdanh')
var SinhVien = require('../models/sinhvien')
var History = require('../models/historydiemdanh')
const jwt = require('jsonwebtoken')

exports.createDiemDanh = ((req, res) => {
    var lop = req.body.lop;

    DiemDanh.create(req.body)
        .then((data) => {
            SinhVien.updateMany({ lop: lop }, { diemdanh: data._id })
                .then(() => {
                    res.sendStatus(200);
                })
                .catch((error) => {
                    res.sendStatus(403);
                });
        })
        .catch((error) => {
            res.sendStatus(403);
        });

})
exports.getDiemDanh = ((req, res) => {
    let id = req.params.id;
    DiemDanh.findOne({ _id: id })
        .then(data => {
            res.send(data);
        })
        .catch(() => {
            res.sendStatus(403)
        })
})

exports.getAllDiemDanh = ((req, res) => {
    DiemDanh.find({})
        .then(data => {
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        })
})

exports.updateDiemDanh = ((req, res) => {
    var id = req.body.id;
    DiemDanh.findById(id)
        .then((data) => {
            if (data.trangthai) {
                DiemDanh.updateOne({ _id: id }, { trangthai: false })
                    .then(() => {

                        res.sendStatus(200)
                    })

            } else {
                DiemDanh.updateOne({ _id: id }, { trangthai: true })
                    .then(() => {

                        res.sendStatus(200)
                    })

            }
        })
        .catch(() => {
            res.sendStatus(403)
        })

})

exports.PostHistory = ((req, res) => {
    let idsv = req.body.idsv
    let idDiemdanh = req.body.idDiemdanh
    History.create({ idsv: req.body.idsv, idDiemdanh: req.body.idDiemdanh })
        .then(e => {
            res.sendStatus(200)
        })
        .catch(e => {
            res.sendStatus(403)
        })
})


exports.getDiemDanhId = ((req, res) => {
    let token = req.body.token
    jwt.verify(token, "abc", (err, data) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                res.status(401).send({ status: 401, message: "Token đã hết hạn" });
            }
        } else {

            SinhVien.findOne({ idsv: data.idsv })
                .select("-matkhau -admin -img")
                .then((e) => {
                    History.find({ idsv: e.idsv })
                        .then(list => {
                        
                            res.status(200).send({ data: list });
                        })
                })

        }
    })
})