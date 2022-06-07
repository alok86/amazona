import bcrypt from 'bcryptjs';
const data = {
  users: [
    {
      name: 'Alok',
      email: 'alok@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'Saumya',
      email: 'saumya@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      //_id: 1,
      name: 'Nike slim shirt',
      slug: 'nike slim shirt',
      category: 'Shirt',
      image: '/image/p1.jpg', //679px x 829px
      price: 1200,
      countInStock: 10,
      brand: 'Nike',
      rating: 4,
      numReviews: 10,
      description: 'high quality shirt',
    },
    {
      // _id: 2,
      name: 'Nike fit shirt',
      slug: 'nike fit shirt',
      category: 'Shirt',
      image: '/image/p2.jpg',
      price: 1200,
      countInStock: 0,
      brand: 'Nike',
      rating: 3.5,
      numReviews: 9,
      description: 'high quality shirt',
    },
    {
      //_id: 3,
      name: 'Nike slim pant',
      slug: 'nike slim pant',
      category: 'pant',
      image: '/image/p3.jpg',
      price: 1100,
      countInStock: 10,
      brand: 'Nike',
      rating: 5,
      numReviews: 8,
      description: 'high quality pant',
    },
    {
      //_id: 4,
      name: 'mufti slim pant',
      slug: 'mufti slim pant2',
      category: 'pant',
      image: '/image/p4.jpg',
      price: 1500,
      countInStock: 10,
      brand: 'Nike',
      rating: 3,
      numReviews: 10,
      description: 'high quality pant',
    },
  ],
};

export default data;
