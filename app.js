const express = require('express')
const app = express()
require('dotenv').config()
var cors = require('cors')
const mongoose = require('mongoose');

MONGODB_URL = 'mongodb+srv://Users:hoducan123@cluster0.thhnc7l.mongodb.net/database?retryWrites=true&w=majority'

mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        // Thêm code xử lý khi kết nối thành công ở đây
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
        // Thêm code xử lý khi kết nối thất bại ở đây
    });

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors())

const MonHoc = require('./api/routes/monhoc.routes');
const SinhVien = require('./api/routes/sinhvien.routes');
const DiemDanh = require('./api/routes/diemdanh.routes');
const Lop = require('./api/routes/lop.routes');


app.use("/monhoc", MonHoc);
app.use("/sinhvien", SinhVien);
app.use("/diemdanh", DiemDanh);
app.use("/lop", Lop);

app.listen(4000)

module.exports = app;