const mongoose = require('mongoose');

/* Function to establish connection to the MongoDB database. */

const dbConnection = async () => {
  // Using async/await for cleaner error handling
  try {
    // Connect to MongoDB using the URI stored in the environment variable
    await mongoose.connect(process.env.MONGO_URI);

    // Log a success message
    console.log('Connected to Database');
  } catch (err) {
    // Log the error message
    console.error('Error connecting to database:', err);

    // Exit the process with an exit code of 1 to indicate an error
    process.exit(1);
  }
};

module.exports = dbConnection;
