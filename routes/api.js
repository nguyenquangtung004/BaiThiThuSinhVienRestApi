var express = require('express');
var router = express.Router();
var {lay_ds,xem_chi_tiet,them_sinh_vien,sua_sinh_vien,tim_kiem} = require('../controllers/sinhVienController')

//http://localhost:3000/api/SinhVien
//Hiển thị danh sách
router.get('/sinhvien', lay_ds)

//http://localhost:3000/api/SinhVien/66b83db500b4f4c45cec4f88
//Xem chi tiết
router.get('/sinhvien/:id', xem_chi_tiet)

//http://localhost:3000/api/SinhVien 
//Sử dụng phương thức post
router.post('/sinhvien', them_sinh_vien)

// http://localhost:3000/api/search
// Sử dụng phương thức GET để tìm kiếm sinh viên theo tên
router.get('/search', tim_kiem);


// http://localhost:3000/api/sinhvien/:id
// Sử dụng phương thức PUT để sửa thông tin sinh viên
router.put('/sinhvien/:id', sua_sinh_vien);

module.exports = router;