var mongoose = require('mongoose')

const SinhVien = new mongoose.Schema(
  {
    ten: {
      type: String,
      required: true
    },
    idsv:{
      type: String,
      required: true
    },
    matkhau:{
      type: String,
      required: true
    },
    ngaysinh:{
      type: Date,
      required: true
    },
    lop:{
      type: String,
      required: true
    },
    img:{
      type: String,
      required: true
    },
    admin:{
      type: Boolean,
      default: false
    },
    diemdanh:{
      type: String,
      default: "null"
    }
  },
)

module.exports = mongoose.model('sinhvien', SinhVien)
