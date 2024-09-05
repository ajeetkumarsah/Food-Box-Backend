const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const kitchenRoutes = require('./routes/kitchenRoutes');
const mealRoutes = require('./routes/mealRoutes');
const orderRoutes = require('./routes/orderRoutes');
const { errorHandler } = require('./middlewares/errorMiddleware');

dotenv.config();
connectDB();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/image/kitchen', express.static('public/kitchen'));
app.use('/image/category', express.static('public/category'));
app.use('/image/user', express.static('public/user'));
app.use('/api/users', userRoutes);
app.use('/api/kitchens', kitchenRoutes);
app.use('/api/meals', mealRoutes);
app.use('/api/orders', orderRoutes);


app.use(errorHandler);

module.exports = app;
