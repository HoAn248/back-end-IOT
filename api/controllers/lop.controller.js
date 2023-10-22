var Lop = require('../models/lop')

exports.getLop = ((req, res) => {
    Lop.find({})
        .then(data => {
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        })
})

exports.createLop = ((req, res) => {
    
    Lop.create(req.body)
    .then(()=>{
        res.sendStatus(200)
    })
    .catch(()=>{
        res.sendStatus(403)
    })
})