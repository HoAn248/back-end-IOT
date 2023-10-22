var MonHoc = require('../models/monhoc')

exports.getMonHoc = ((req, res) => {
    MonHoc.find({})
        .then(data => {
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        })
})

exports.createMonHoc = ((req, res) => {
    const tenmon = req.body.tenmon
    const gv = req.body.giaovien
    MonHoc.create({tenmon: tenmon, giaovien: gv})
    .then(()=>{
        res.sendStatus(200)
    })
    .catch(()=>{
        res.sendStatus(403)
    })
})