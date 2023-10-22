const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./app');
const expect = chai.expect;

chai.use(chaiHttp);
describe('SinhVien API', () => {
    
    it('lấy tất cả sinh viên', (done) => {
        chai
            .request(app)
            .get('/sinhvien/all')
            .end((err, res) => {
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('tạo 1 sinh viên', (done) => {
        const sinhvien = {
            ten: 'sinhvien 1',
            idsv: '52809',
            tuoi: 30,
            ngaysinh: "24/08/2002",
            lop: "ST20A2A",
            img: "hình ảnh fake"
        };

        chai
            .request(app)
            .post('/sinhvien')
            .send(sinhvien)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });


    it('Lấy 1 sinh viên với id là 52809', (done) => {
        chai
            .request(app)
            .get('/sinhvien/52809')
            .end((err, res) => {
                expect(res.body).to.be.an('object');
                done();
            });
    });

    it('sửa tên của sinh viên có id 52809 thành Hồ An', (done) => {
        const sinhvien = {
            ten: 'Hồ An'
        };

        chai
            .request(app)
            .post('/sinhvien/update/52809')
            .send(sinhvien)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

    it('sửa tên của sinh viên có id 00000 thành Hồ An', (done) => {
        const sinhvien = {
            ten: 'Hồ An'
        };

        chai
            .request(app)
            .post('/sinhvien/update/00000')
            .send(sinhvien)
            .end((err, res) => {
                expect(res).to.have.status(403);
                done();
                process.exit(0);
            });
    });

});
