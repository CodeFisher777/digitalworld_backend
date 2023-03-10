import express from 'express';
import mongoose from 'mongoose';
import fs from 'fs';
import { registerValidation, loginValidation } from './valiadtions.js';
import { checkAuth, handleValidationErrors } from './utils/index.js';
import multer from 'multer';
import cors from 'cors';
import { UserController, ProductController, OrderController } from './controllers/index.js';

mongoose
  .connect(process.env.MONGODB_URI)

  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error', err));

const app = express();
app.use(cors());
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads');
    }
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get('/products', ProductController.getAll);
app.get('/products/:id', ProductController.getOne);
app.post('/products', checkAuth, ProductController.create);
app.delete('/products/:id', checkAuth, ProductController.remove);
app.patch('/products/:id', checkAuth, ProductController.update);

app.get('/orders', OrderController.getAll);
app.get('/lastOrder', OrderController.getLastOne);

app.post('/orders', OrderController.create);
app.delete('/orders/:id', OrderController.remove);

app.listen(process.env.PORT || 4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server OK');
});
