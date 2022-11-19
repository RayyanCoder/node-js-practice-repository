const express = require('express');
const tourController = require('./../Controllers/toursController');
const router  = express.Router();
const authController = require('./../Controllers/authController');

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

  router.route('/tour-stats').get(tourController.getTourStats);
  router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router.route('/').post(tourController.createTour).get(authController.protect,tourController.getAllTours);
router.route('/:id').patch(tourController.updateTour).get(tourController.getTour).delete(tourController.deleteTour);

module.exports = router;  