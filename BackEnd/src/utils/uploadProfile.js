const multer = require("multer");
const path = require("path");

// Set up multer storage and file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads"); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    // Rename the file to prevent naming conflicts
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

module.exports = { upload }
