import express from 'express';
import mongoose from 'mongoose';
import data from './data.js';
import path from 'path';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import dataRouter from './routes/dataRouter.js';
import orderRouter from './routes/orderRouter.js';
import Razorpay from 'razorpay';

dotenv.config();
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to database');
  })
  .catch((err) => {
    console.log(err.message);
  });
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/keys/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'SB');
});
app.use('/api/keys/razorpay', (req, res) => {
  res.send(process.env.RAZORPAY_KEY_ID);
});

app.post('/api/create-order', async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.KEY_SECRET,
    });
    // console.log(req.body.amount);
    const options = {
      amount: req.body.amount,
      currency: 'INR',
    };
    const order = await instance.orders.create(options);
    if (!order) return res.status(500).send('Some error occured');
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.use('/api/seed', seedRouter);
// test
// app.get('/api/products', (req, res) => {
//   res.send(data.products);
// });
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/data', dataRouter);
app.use('/api/orders', orderRouter);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
