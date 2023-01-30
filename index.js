import express from 'express';
import mongoose from 'mongoose';
import { registerValidation, loginValidation } from './valiadtions.js';
import { checkAuth, handleValidationErrors } from './utils/index.js';
import multer from 'multer';
import cors from 'cors';
import { UserController, ProductController, OrderController } from './controllers/index.js';

mongoose
  .connect(
    'mongodb+srv://admin:wwwwww@cluster0.regbbwg.mongodb.net/shop?retryWrites=true&w=majority',
  )
  .then(() => console.log('DB ok'))
  .catch(() => console.log('DB error', err));

const app = express();
app.use(cors());
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
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
app.post('/orders', OrderController.create);
app.delete('/orders/:id', OrderController.remove);
//запросы на фильтрацию
app.get('/productscategory=:category', ProductController.getCategory);

app.get('/productssortprice:sort', ProductController.getSortPrice);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server OK');
});
