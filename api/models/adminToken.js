var mongoose = require('mongoose')

const AdminToken = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true
    }
}
)

module.exports = mongoose.model('admintoken', AdminToken)
