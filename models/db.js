const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/thi_thu_2')
    .then(() => {
        console.log("Kết nối CSDL thành công");
    })
    .catch((err) => {
        console.log("Lỗi kết nối CSDL");
        console.log(err);
    });

module.exports = { mongoose };