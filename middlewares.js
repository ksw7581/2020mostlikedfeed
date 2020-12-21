const multer = require('multer');
const middlewares = {};

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './public/images');
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname) // cb 콜백함수를 통해 전송된 파일 이름 설정
        }
    })
});

middlewares.cpUpload = upload.fields([{
    name: 'downloadimg',
    maxCount: 1
}]);

module.exports = middlewares;
