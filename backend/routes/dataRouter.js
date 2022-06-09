import express from 'express';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';

const dataRouter = express.Router();

dataRouter.get('/', async (req, res) => {
  const products = await Product.find();
  const users = await User.find();
  res.send({ products, users });
});

export default dataRouter;
