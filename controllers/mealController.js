const Meal = require('../models/Meal');
const jwt = require('jsonwebtoken');

exports.createMeal = async (req, res) => {
    try {
        const { name, description, price, kitchen } = req.body;
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.sendStatus(401); // No token provided
        }

        let userId = '';
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403); // Token is not valid
            }
            userId = user.id;
        });
                 let imageUrls = [];

        if (req.files && req.files.length > 0) {
            imageUrls = req.files.map(file => `http://15.207.167.2:5000/image/meals/${file.filename}`);
        }

        const meal = new Meal({ name, description, price, kitchen, images:imageUrls });
        await meal.save();
        res.status(201).json(meal);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.getMeals = async (req, res) => {
    try {
        const meals = await Meal.find();
        res.status(200).json(meals);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getMealById = async (req, res) => {
    try {
        const meal = await Meal.findById(req.params.id);
        if (!meal) {
            return res.status(404).json({ message: 'Meal not found' });
        }
        res.status(200).json(meal);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateMeal = async (req, res) => {
    try {
        const meal = await Meal.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!meal) {
            return res.status(404).json({ message: 'Meal not found' });
        }
        res.status(200).json(meal);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteMeal = async (req, res) => {
    try {
        const meal = await Meal.findByIdAndDelete(req.params.id);
        if (!meal) {
            return res.status(404).json({ message: 'Meal not found' });
        }
        res.status(200).json({ message: 'Meal deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


