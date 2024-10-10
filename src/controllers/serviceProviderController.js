const ServiceProvider = require('../models/ServiceProviderModels/ServiceProviderModel');

// Create a new service provider
exports.createServiceProvider = async (req, res) => {
    try {
        const serviceProvider = new ServiceProvider(req.body);
        await serviceProvider.save();
        res.status(201).json(serviceProvider);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all service providers
exports.getAllServiceProviders = async (req, res) => {
    try {
        const serviceProviders = await ServiceProvider.find();
        res.status(200).json(serviceProviders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a service provider by ID
exports.getServiceProviderById = async (req, res) => {
    try {
        const serviceProvider = await ServiceProvider.findById(req.params.id);
        if (!serviceProvider) return res.status(404).json({ message: 'Service Provider not found' });
        res.status(200).json(serviceProvider);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a service provider by ID
exports.updateServiceProvider = async (req, res) => {
    try {
        const serviceProvider = await ServiceProvider.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!serviceProvider) return res.status(404).json({ message: 'Service Provider not found' });
        res.status(200).json(serviceProvider);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a service provider by ID
exports.deleteServiceProvider = async (req, res) => {
    try {
        const serviceProvider = await ServiceProvider.findByIdAndDelete(req.params.id);
        if (!serviceProvider) return res.status(404).json({ message: 'Service Provider not found' });
        res.status(200).json({ message: 'Service Provider deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Book a slot for a service provider
exports.bookSlot = async (req, res) => {
    try {
        const serviceProvider = await ServiceProvider.findById(req.params.id);
        if (!serviceProvider) return res.status(404).json({ message: 'Service Provider not found' });

        const { date, time } = req.body;
        const slotIndex = serviceProvider.availableSlots.findIndex(slot =>
            slot.date.toISOString() === new Date(date).toISOString() && slot.time === time
        );

        if (slotIndex === -1 || serviceProvider.availableSlots[slotIndex].isBooked) {
            return res.status(400).json({ message: 'Slot not available or already booked' });
        }

        serviceProvider.availableSlots[slotIndex].isBooked = true;
        await serviceProvider.save();

        res.status(200).json({ message: 'Slot booked successfully', slot: serviceProvider.availableSlots[slotIndex] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all reviews of a service provider
exports.getReviews = async (req, res) => {
    try {
        const serviceProvider = await ServiceProvider.findById(req.params.id);
        if (!serviceProvider) return res.status(404).json({ message: 'Service Provider not found' });

        res.status(200).json(serviceProvider.reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a review to a service provider
exports.addReview = async (req, res) => {
    try {
        const serviceProvider = await ServiceProvider.findById(req.params.id);
        if (!serviceProvider) return res.status(404).json({ message: 'Service Provider not found' });

        const { user, rating, comment } = req.body;
        const review = { user, rating, comment };

        serviceProvider.reviews.push(review);
        serviceProvider.averageRating = (serviceProvider.reviews.reduce((acc, review) => acc + review.rating, 0) / serviceProvider.reviews.length).toFixed(1);

        await serviceProvider.save();

        res.status(201).json({ message: 'Review added successfully', reviews: serviceProvider.reviews });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
