const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up multer for file upload

const storageKitchen = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/kitchen');
  },
  filename: function(req, file, cb) {
    // Check file type based on its extension
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (extname) {
      cb(null, Date.now() + "_" + Math.floor(Math.random() * 1000) + path.extname(file.originalname));
    } else {
      cb("Error: only .jpeg, .jpg, .png files are allowed!");
    }
  }
});
const uploadKitchen = multer({  storage: storageKitchen,
  limits: {
    fileSize: 1024 * 1024 * 5 // limit filesize to 5MB
  }, });


  const storageUser = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/user');
  },
  filename: function(req, file, cb) {
    // Check file type based on its extension
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (extname) {
      cb(null, Date.now() + "_" + Math.floor(Math.random() * 1000) + path.extname(file.originalname));
    } else {
      cb("Error: only .jpeg, .jpg, .png files are allowed!");
    }
  }
});
const uploadUser = multer({  storage: storageUser,
  limits: {
    fileSize: 1024 * 1024 * 5 // limit filesize to 5MB
  }, });




  const storageMeal = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/user');
  },
  filename: function(req, file, cb) {
    // Check file type based on its extension
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (extname) {
      cb(null, Date.now() + "_" + Math.floor(Math.random() * 1000) + path.extname(file.originalname));
    } else {
      cb("Error: only .jpeg, .jpg, .png files are allowed!");
    }
  }
});
  const uploadMeal = multer({  storage: storageMeal,
  limits: {
    fileSize: 1024 * 1024 * 5 // limit filesize to 5MB
  }, });
  const storageCategory = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/meal');
  },
  filename: function(req, file, cb) {
    // Check file type based on its extension
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (extname) {
      cb(null, Date.now() + "_" + Math.floor(Math.random() * 1000) + path.extname(file.originalname));
    } else {
      cb("Error: only .jpeg, .jpg, .png files are allowed!");
    }
  }
});
const uploadCategory = multer({  storage: storageUser,
  limits: {
    fileSize: 1024 * 1024 * 5 // limit filesize to 5MB
  }, });
const uploadImageToBase64 = (req, res, next) => {
    if (!req.file) {
        return next();
    }
    const image = req.file.buffer.toString('base64');
    req.body.image = image;
    next();
};

module.exports = { uploadKitchen,uploadUser,uploadCategory,uploadMeal, uploadImageToBase64 };
