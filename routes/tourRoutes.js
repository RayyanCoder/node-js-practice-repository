const express = require('express');
const tourController = require('./../Controllers/toursController');
const router  = express.Router();

router.route('/').post(tourController.createTour).get(tourController.getAllTours);
router.route('/:id').patch(tourController.updateTour).get(tourController.getTour).delete(tourController.deleteTour);

module.exports = router;  