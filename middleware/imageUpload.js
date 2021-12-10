const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create multer object
// AFTER : Create multer object
const imageUpload = multer({
    storage: multer.diskStorage(
        {
            destination: function (req, file, cb) {
                // console.log(req);
                // console.log(req.admin_id.id);
                const id  = req.user.id;
                const path = './public/images/' + id.toString();
                fs.mkdirSync(path, { recursive: true });

                cb(null,path+"/");
            },
            filename: function (req, file, cb) {
                
                cb(

                    null,
                    new Date().valueOf() + 
                    '_' +
                    file.originalname
                );
            }
        }
    ), 
});
module.exports = {imageUpload}