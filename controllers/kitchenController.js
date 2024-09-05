const Kitchen = require('../models/Kitchen');
const Meal = require('../models/Meal');
const multer = require('multer');
const jwt = require('jsonwebtoken');


exports.createKitchen = async (req, res) => {
    try {
        const { name, description, address,rating,totalRatings  } = req.body;
         let imageUrls = [];

        if (req.files && req.files.length > 0) {
            imageUrls = req.files.map(file => `http://15.207.167.2:5000/image/kitchen/${file.filename}`);
        }
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Assuming Bearer token

        if (!token) {
            return res.sendStatus(401); // No token provided
        }
        let userId='';
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403); // Token is not valid
            }
            userId = user.id;
        });
        const kitchen = new Kitchen({ name:name,description:description,owner:userId ,address:address,rating:rating||"0",totalRatings:totalRatings||"0", images: imageUrls });
        await kitchen.save();
        res.status(201).json(kitchen);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getKitchens = async (req, res) => {
    try {
        const kitchens = await Kitchen.find().populate('meals');
        res.status(200).json({"status":true,"message":"Kitchen fetched successfully!","data":kitchens});
    } catch (error) {
        res.status(400).json({ "status":false,error: error.message });
    }
};

exports.getKitchenById = async (req, res) => {
    try {
        const kitchen = await Kitchen.findById(req.params.id).populate('meals');
        if (!kitchen) {
            return res.status(404).json({ message: 'Kitchen not found' });
        }
        res.status(200).json(kitchen);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.updateKitchen = async (req, res) => {
    try {
        const { id } = req.params; // Assuming kitchen ID is passed as a URL parameter
        const updates = req.body;
        let imageUrls = [];

        if (req.files && req.files.length > 0) {
            imageUrls = req.files.map(file => `http://15.207.167.2:5000/image/kitchen/${file.filename}`);
            updates.images = imageUrls;
        }

        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Assuming Bearer token

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

        const kitchen = await Kitchen.findById(id);
        if (!kitchen) {
            return res.status(404).json({ error: 'Kitchen not found' });
        }

        // Check if the authenticated user is the owner of the kitchen
        if (kitchen.owner.toString() !== userId) {
            return res.status(403).json({ error: 'User not authorized to update this kitchen' });
        }

        // Update kitchen fields
        for (const key in updates) {
            kitchen[key] = updates[key];
        }

        await kitchen.save();
        res.status(200).json(kitchen);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.deleteKitchen = async (req, res) => {
    try {
        const kitchen = await Kitchen.findByIdAndDelete(req.params.id);
        if (!kitchen) {
            return res.status(404).json({ message: 'Kitchen not found' });
        }
        res.status(200).json({ message: 'Kitchen deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.addMealToKitchen = async (req, res) => {
    console.log('===>Calling Kitchen Meal');
    try {
        const { kitchenId } = req.params; // Assuming kitchen ID is passed as a URL parameter
       const { mealId} = req.body;

        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Assuming Bearer token

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

        const kitchen = await Kitchen.findById(kitchenId);
        if (!kitchen) {
            return res.status(404).json({"status":false, error: 'Kitchen not found' });
        }

        // Check if the authenticated user is the owner of the kitchen
        if (kitchen.owner.toString() !== userId) {
            return res.status(403).json({"status":false, error: 'User not authorized to add meals to this kitchen' });
        }

        const meal = await Meal.findById(mealId);
        if (!meal) {
            return res.status(404).json({"status":false, error: 'Meal not found' });
        }

// Check if the meal is already in the kitchen's meals array
        if (kitchen.meals.some(existingMeal => existingMeal._id.toString() === mealId)) {
            return res.status(400).json({ "status":false,error: 'Meal already exists in the kitchen' });
        }
        kitchen.meals.push(meal);
        await kitchen.save();


        res.status(201).json({ kitchen });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};