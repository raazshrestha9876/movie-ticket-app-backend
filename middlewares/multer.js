import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype.startsWith("image/")){
        cb(null, true);
    }else{
        cb(new Error('Only image file are allowed!'), false);
    }
}

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
    fileFilter,
  });
  
export default upload;