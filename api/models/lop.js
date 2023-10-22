var mongoose = require('mongoose')

const Lop = new mongoose.Schema(
    {
        lop: {
            type: String,
            required: true
        },
        giaovien: {
            type: String,
            required: true
        }
    }
)

module.exports = mongoose.model('lop', Lop)
