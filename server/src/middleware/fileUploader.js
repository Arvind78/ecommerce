const multer = require('multer'); // Import the multer middleware for file handling
const path = require('path'); // Import the path module for working with file paths

// Configure the Multer storage using diskStorage
const storage = multer.diskStorage({
  // Define the destination directory for uploaded files
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/'); // Save files in the 'public/uploads/' directory
  },

  // Generate a unique filename for each uploaded file
  filename: function (req, file, cb) {
    // Create a unique suffix using current timestamp and random number
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);

    // Extract the original filename and extension
    const originalname = path.parse(file.originalname);

    // Combine the original name with unique suffix and extension
    cb(null, originalname.name + '-' + uniqueSuffix + originalname.ext);
  },
});

// Create a Multer instance with the configured storage
const upload = multer({ storage: storage });

// Export the upload middleware as a module
module.exports = { upload };
