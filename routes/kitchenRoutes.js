const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { uploadKitchen,uploadMeal, uploadImageToBase64 } = require('../middlewares/uploadMiddleware');

const {
    createKitchen,
    getKitchens,
    getKitchenById,
    updateKitchen,
    deleteKitchen,
    addMealToKitchen,
} = require('../controllers/kitchenController');
// Protected routes
router.use(authMiddleware);

router.post('/', uploadKitchen.array('images'), uploadImageToBase64, createKitchen);
router.get('/', getKitchens);
router.get('/:id', getKitchenById);
router.put('/:id', uploadKitchen.array('images'), uploadImageToBase64, updateKitchen);
router.delete('/:id', deleteKitchen);
router.post('/:kitchenId/meals', addMealToKitchen);
module.exports = router;
