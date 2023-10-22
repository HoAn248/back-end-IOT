var mongoose = require('mongoose')

const MonHoc = new mongoose.Schema(
  {
    tenmon: {
      type: String,
      required: true
    },
    giaovien:{
      type: String,
      required: true
    }
  }
)

module.exports = mongoose.model('monhoc', MonHoc)
