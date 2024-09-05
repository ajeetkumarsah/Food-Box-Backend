const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

const { uploadMeal, uploadImageToBase64 } = require('../middlewares/uploadMiddleware');

const {
    createMeal,
    getMeals,
    getMealById,
    updateMeal,
    deleteMeal,

} = require('../controllers/mealController');
// Protected routes
router.use(authMiddleware);


router.post('/',uploadMeal.array('images'), uploadImageToBase64, createMeal);
router.get('/', getMeals);
router.get('/:id', getMealById);
router.put('/:id', updateMeal);
router.delete('/:id', deleteMeal);

module.exports = router;
