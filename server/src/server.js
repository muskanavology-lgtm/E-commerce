const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); 
const path = require('path'); 
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');  
const orderRoutes = require('./routes/orderRoutes');   
const uploadRoutes = require('./routes/uploadRoutes');
const dns = require('node:dns');
dns.setServers(['1.1.1.1', '8.8.8.8']);
const app = express();

dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(`[Incoming Request] Method: ${req.method} | URL: ${req.url}`);
  next();
});
app.use('/api/users', userRoutes);   
if (typeof uploadRoutes !== 'undefined') {
  app.use('/api/upload', uploadRoutes);
}
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));