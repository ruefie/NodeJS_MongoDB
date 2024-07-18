require('dotenv').config();
const express = require('express');
const connectDB = require('./src/db/pool'); // Ensure this path is correct
const usersRouter = require('./src/routes/users');
const ordersRouter = require('./src/routes/orders');

const app = express();
app.use(express.json());


connectDB();


app.use('/users', usersRouter);
app.use('/orders', ordersRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));

module.exports = app;
