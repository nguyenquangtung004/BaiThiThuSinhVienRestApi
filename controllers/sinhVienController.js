const { SinhVien } = require('../models/sinhVienModel');

// http://localhost:3000/api/sinhvien
exports.lay_ds = async (req, res, next) => {
    let dieuKien = {};
    try {
        // Kiểm tra nếu có tham số truy vấn 'ten_ph32251' thì tạo điều kiện tìm kiếm
        if (typeof(req.query.sinhVien) !== 'undefined') {
            dieuKien.ten_ph32251 = req.query.sinhVien;
        }
        // Sử dụng điều kiện dieuKien trong truy vấn MongoDB
        let list = await SinhVien.find(dieuKien);
        res.status(200).json(list);
    } catch (error) {
        res.status(400).json({ "msg": error.message });
    }
};

exports.xem_chi_tiet = async (req, res, next) => {
    try {
        let id = req.params.id;
        let objSinhVien = await SinhVien.findById(id);

        if (!objSinhVien) {
            return res.status(404).json({ "msg": "Không tìm thấy sinh viên" });
        }

        res.status(200).json(objSinhVien);
    } catch (error) {
        res.status(400).json({ "msg": error.message });
    }
}

exports.them_sinh_vien = async (req, res, next) => {
    try {
        let {
            ma_sinh_vien_ph32251,
            ten_ph32251,
            gioi_tinh_ph32251,
            ngay_sinh_ph32251,
            khoa_hoc_ph32251,
            lop_ph32251
        } = req.body;

        // Tạo đối tượng SinhVien mới
        let objSinhVien = new SinhVien({
            ma_sinh_vien_ph32251,
            ten_ph32251,
            gioi_tinh_ph32251,
            ngay_sinh_ph32251: new Date(ngay_sinh_ph32251), // Chuyển đổi string thành Date
            khoa_hoc_ph32251,
            lop_ph32251
        });

        // Lưu đối tượng vào MongoDB
        let ket_qua = await objSinhVien.save();
        res.status(201).json(ket_qua);
    } catch (error) {
        res.status(400).json({ "msg": error.message });
    }   
}

// API để sửa thông tin sinh viên
// http://localhost:3000/api/sinhvien/:id
// Sử dụng phương thức PUT
exports.sua_sinh_vien = async (req, res, next) => {
    try {
        let id = req.params.id;
        let updateData = {
            ...req.body,
            ngay_sinh_ph32251: new Date(req.body.ngay_sinh_ph32251) // Chuyển đổi string thành Date nếu có ngày sinh
        };
        let objSinhVien = await SinhVien.findByIdAndUpdate(id, updateData, { new: true });
        if (!objSinhVien) {
            return res.status(404).json({ "msg": "Không tìm thấy sinh viên để sửa" });
        }
        res.status(200).json(objSinhVien);
    } catch (error) {
        res.status(400).json({ "msg": error.message });
    }
};

// Tìm kiếm sinh viên theo tên và khóa học
// http://localhost:3000/api/search?sinhvien=ten_ph32251&khoahoc=khoa_hoc_ph32251
// Sử dụng phương thức GET
exports.tim_kiem = async (req, res, next) => {
    try {
        const queryTen = req.query.sinhvien; // Tên sinh viên được gửi từ query parameter
        const queryKhoaHoc = req.query.khoahoc; // Khóa học được gửi từ query parameter

        let dieuKien = {};

        // Tạo điều kiện tìm kiếm theo tên nếu có
        if (queryTen) {
            dieuKien.ten_ph32251 = new RegExp(queryTen, 'i'); // 'i' để không phân biệt hoa thường
        }

        // Tạo điều kiện tìm kiếm theo khóa học nếu có
        if (queryKhoaHoc) {
            dieuKien.khoa_hoc_ph32251 = queryKhoaHoc;
        }

        const sinhViens = await SinhVien.find(dieuKien);
        res.status(200).json(sinhViens);
    } catch (err) {
        res.status(500).json({ "msg": err.message });
    }
};

