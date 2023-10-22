var mongoose = require('mongoose')

const History = new mongoose.Schema(
    {
        idsv: {
            type: String,
            required: true
        },
        idDiemdanh: {
            type: String,
            required: true
        }
    },
)

module.exports = mongoose.model('history', History)
