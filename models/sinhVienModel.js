const { mongoose } = require('./db');

const sinhVienSchema = new mongoose.Schema(
    {
        ma_sinh_vien_ph32251: { 
            type: String, 
            required: true 
        },
        ten_ph32251: { 
            type: String, 
            required: true 
        },
        gioi_tinh_ph32251: { 
            type: String, 
            enum: ['Nam', 'Nữ', 'Khác'], 
            required: true 
        },
        ngay_sinh_ph32251: { 
            type: Date, 
            required: true 
        },
        khoa_hoc_ph32251: { 
            type: Number, 
            required: true 
        },
        lop_ph32251: { 
            type: String, 
            required: true 
        }  
    },
    {
        collection: 'SinhVien'
    }
);

// Tạo model SinhVien với schema đã định nghĩa
let SinhVien = mongoose.model('SinhVien', sinhVienSchema);

module.exports = { SinhVien };
