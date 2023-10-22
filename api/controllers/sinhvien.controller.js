var SinhVien = require('../models/sinhvien')
// var AdminToken = require('../models/adminToken')
const jwt = require('jsonwebtoken')
exports.getAllSinhVien = ((req, res) => {
    SinhVien.find({})
        .select("-matkhau -admin")
        .then(data => {
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        })
})

exports.getSinhVien = ((req, res) => {
    let id = req.params.id;
    SinhVien.findOne({ idsv: id })
        .select("-matkhau -admin")
        .then(data => {
            res.send(data);
        })
        .catch(() => {
            res.sendStatus(403)
        })
})

exports.createSinhVien = ((req, res) => {
    const data = req.body
    SinhVien.findOne({ idsv: data.idsv })
        .then(e => {
            if (!e) {
                SinhVien.create(data)
                    .then(() => {
                        res.sendStatus(200)
                    })
                    .catch(() => {
                        res.sendStatus(403)
                    })
            }
            else {
                res.sendStatus(401)
            }
            // if (!data) {
            //     SinhVien.create(data)
            //         .then(() => {
            //             res.sendStatus(200)
            //         })
            //         .catch(() => {
            //             res.sendStatus(403)
            //         })
            // }else{
            //     res.sendStatus(401)
            // }
        })
        .catch(() => {
            res.sendStatus(403)
        })

})

exports.updateSinhVien = ((req, res) => {
    let id = req.params.id;
    let data = req.body;

    // SinhVien.updateOne({ idsv: id }, data)
    // .then(()=>{
    //     res.sendStatus(200)
    // })
    // .catch(() => {
    //     res.sendStatus(403)
    // })
    SinhVien.updateOne({ idsv: id }, data)
        .then(e => {
            if (e.matchedCount === 0) {
                res.sendStatus(403);
            } else {
                res.sendStatus(200);
            }
        })
        .catch((error) => {
            res.sendStatus(500);
        });
})

exports.updateDiemDanh = ((req, res) => {
    let id = req.params.id;

    SinhVien.updateOne({ idsv: id }, { diemdanh: "null" })
        .then(() => {
            res.sendStatus(200)
        })
        .catch(() => {
            res.sendStatus(403)
        })
})

exports.deleteSinhVien = ((req, res) => {
    let id = req.params.id;
    SinhVien.deleteOne({ idsv: id })
        .then(() => {
            res.sendStatus(200)
        })
        .catch(() => {
            res.sendStatus(403)
        })
})

exports.login = ((req, res) => {
    SinhVien.findOne({ idsv: req.body.idsv })
        .then((data) => {
            if (data) {
                if (req.body.matkhau === data.matkhau) {
                    let token = jwt.sign({ idsv: data.idsv }, "abc", { expiresIn: '1d' })
                    // if(data.admin){
                    //     AdminToken.create({token:token})
                    // }
                    res.status(200).json({ token: token, mess: "đăng nhập thành công" })
                } else {
                    // res.status(401).json({ mess: "Mật khẩu lởm" });
                    res.sendStatus(401)
                }
            } else {
                res.sendStatus(401)
            }
        })
        // .catch((err) => {
        //     res.status(401).json({ mess: "Yêu cầu thất bại" });
        //     console.log(err);
        // })
})


exports.checkToken = ((req, res) => {
    let token = req.body.token;

    jwt.verify(token, "abc", (err, data) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                res.status(401).send({ status: 401, message: "Token đã hết hạn" });
            }
        } else {
            SinhVien.findOne({ idsv: data.idsv })
                .select("-matkhau -admin -img")
                .then((e) => {
                    res.status(200).send({ status: 200, data: e});
                })
        }
    })

})

exports.checkAdmin = ((req, res) => {
    let token = req.body.token;
    jwt.verify(token, "abc", (err, data) => {
        
        if (err) {
            res.status(401).send({ status: 401, message: "Token đã hết hạn" });
        } else {
            SinhVien.findOne({ idsv: data.idsv })
                .then((e) => {
                    
                    if(e.admin){
                        res.status(200).send({ status: 200});
                    }else{
                        res.status(403).send({ status: 403});
                    }
                })
        }
    })

})

