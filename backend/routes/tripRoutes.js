const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createTrip,
  getUserTrips,
  getTripById,
  deleteTrip,
  updateTrip,
  addActivity,
  removeActivity,
  regenerateDay,
} = require('../controllers/tripController');

router.use(auth);

router.post('/', createTrip);
router.get('/', getUserTrips);
router.get('/:id', getTripById);
router.put('/:id', updateTrip);
router.delete('/:id', deleteTrip);
router.post('/:id/activities', addActivity);
router.delete('/:id/activities/:activityId', removeActivity);
router.post('/:id/regenerate-day', regenerateDay);

module.exports = router;