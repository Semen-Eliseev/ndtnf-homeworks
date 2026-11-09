import multer from 'multer';

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, 'public/books');
    },
    filename: (_req, file, cb) => {
        cb(null, `${file.originalname}`);
    }
});

export const fileMulter = multer({ storage });
