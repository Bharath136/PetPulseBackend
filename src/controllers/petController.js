const Pet = require('../models/petModel'); // Import the Pet model

// Create a new pet
exports.createPet = async (req, res) => {
    try {
        const newPet = new Pet(req.body);
        const savedPet = await newPet.save();
        res.status(201).json(savedPet);
    } catch (error) {
        res.status(400).json({ message: 'Error creating pet', error });
    }
};

// Get a single pet by ID
exports.getPetById = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id).populate('owner');
        if (!pet) return res.status(404).json({ message: 'Pet not found' });
        res.status(200).json(pet);
    } catch (error) {
        res.status(400).json({ message: 'Error retrieving pet', error });
    }
};

// Get all pets
exports.getAllPets = async (req, res) => {
    try {
        const pets = await Pet.find().populate('owner');
        res.status(200).json(pets);
    } catch (error) {
        res.status(400).json({ message: 'Error retrieving pets', error });
    }
};

// Update pet details
exports.updatePet = async (req, res) => {
    try {
        const updatedPet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPet) return res.status(404).json({ message: 'Pet not found' });
        res.status(200).json(updatedPet);
    } catch (error) {
        res.status(400).json({ message: 'Error updating pet', error });
    }
};

// Delete a pet
exports.deletePet = async (req, res) => {
    try {
        const deletedPet = await Pet.findByIdAndDelete(req.params.id);
        if (!deletedPet) return res.status(404).json({ message: 'Pet not found' });
        res.status(200).json({ message: 'Pet deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting pet', error });
    }
};

// Add medical history record to a pet
exports.addMedicalHistory = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id);
        if (!pet) return res.status(404).json({ message: 'Pet not found' });

        pet.medicalHistory.push(req.body); // Add new medical history
        const updatedPet = await pet.save();
        res.status(200).json(updatedPet);
    } catch (error) {
        res.status(400).json({ message: 'Error adding medical history', error });
    }
};

// Update health metrics
exports.updateHealthMetrics = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id);
        if (!pet) return res.status(404).json({ message: 'Pet not found' });

        pet.healthMetrics.push(req.body); // Add new health metrics
        const updatedPet = await pet.save();
        res.status(200).json(updatedPet);
    } catch (error) {
        res.status(400).json({ message: 'Error updating health metrics', error });
    }
};
