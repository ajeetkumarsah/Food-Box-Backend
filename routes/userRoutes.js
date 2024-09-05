const express = require('express');
const router = express.Router();
const { uploadUser, uploadImageToBase64 } = require('../middlewares/uploadMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const {
    register,
    login,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
} = require('../controllers/userController');

router.post('/register', uploadUser.single('profilePicture'), uploadImageToBase64, register);
router.post('/login', login);

// Protected routes
router.use(authMiddleware);


router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', uploadUser.single('profilePicture'), uploadImageToBase64, updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
