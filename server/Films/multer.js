const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/films');
    },
    filename: (req, file, cb) => {
        // poster.png   ->   ['poster', 'png']
        let ext = file.originalname.split('.').at(-1);  // 'png'
        let unique = Date.now();                        // 645598891489
        let newFileName = `${unique}.${ext}`;           // '645598891489.png'

        cb(null, newFileName);
    }
});

const upload = multer({ storage: storage });


module.exports = { upload };