const express = require('express');
const router = express.Router();
const serviceProviderController = require('../controllers/serviceProviderController');

// Routes for CRUD operations
router.post('/add-service', serviceProviderController.createServiceProvider);
router.get('/', serviceProviderController.getAllServiceProviders);
router.get('/:serviceType', serviceProviderController.getServices);
router.get('/:id', serviceProviderController.getServiceProviderById);
router.put('/:id', serviceProviderController.updateServiceProvider);
router.delete('/:id', serviceProviderController.deleteServiceProvider);

// Booking a slot
router.post('/:id/book', serviceProviderController.bookSlot);

// Reviews
router.get('/:id/reviews', serviceProviderController.getReviews);
router.post('/:id/reviews', serviceProviderController.addReview);

module.exports = router;
