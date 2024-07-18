const mongoose = require("mongoose");
const User = require("../src/models/User");
const Order = require("../src/models/Order");

const seedData = async () => {
  try {
   
    const users = await User.insertMany([
      { first_name: 'John', last_name: 'Doe', age: 18 },
      { first_name: 'Bob', last_name: 'Dylan', age: 30 },
      { first_name: 'Jane', last_name: 'Doe', age: 25 }
    ]);

   
    const userId1 = users[0]._id; 
    const userId2 = users[1]._id; 

    
    await Order.insertMany([
      { price: 18, date: '2021-01-01T00:00:00.000Z', user_id: userId1 },
      { price: 18, date: '2021-01-02T04:00:00.000Z', user_id: userId1 },
      { price: 18, date: '2021-01-03T05:00:00.000Z', user_id: userId2 },
      { price: 18, date: '2021-01-04T06:00:00.000Z', user_id: userId2 }
    ]);

    console.log('Data inserted successfully');
    process.exit();
  } catch (err) {
    console.error('Error inserting data:', err.message);
    process.exit(1); 
  }
};

require("../src/db/pool")()
  .then(seedData)
  .catch((err) => console.error("MongoDB connection error:", err.message));
