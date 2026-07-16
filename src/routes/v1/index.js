const express = require('express');
const CityController = require('../../controllers/city-controller');
const AirportController = require('../../controllers/airport-controller');
const FlightController = require('../../controllers/flight-controller');
const AirplaneController = require('../../controllers/airplane-controller');

const router = express.Router();

// City routes — specific routes pehle, dynamic (:id) baad mein
router.post('/city', CityController.create);
router.post('/city/bulk', CityController.createMultipleCity);
router.get('/city', CityController.getAll);
router.get('/city/:id', CityController.get);
router.get('/city/:id/airports', CityController.getAirportsOfCity);
router.patch('/city/:id', CityController.update);
router.delete('/city/:id', CityController.destroy);

// Airport routes
router.post('/airport', AirportController.create);
router.get('/airport/:id', AirportController.get);
router.patch('/airport/:id', AirportController.update);
router.delete('/airport/:id', AirportController.destroy);

// Flight routes
router.post('/flight', FlightController.create);
router.get('/flight', FlightController.getAll);
router.get('/flight/:id', FlightController.get);
router.patch('/flight/:id', FlightController.update);
router.delete('/flight/:id', FlightController.destroy);


// Airplane routes
router.post('/airplane', AirplaneController.create);
router.get('/airplane', AirplaneController.getAll);
router.get('/airplane/:id', AirplaneController.get);
router.patch('/airplane/:id', AirplaneController.update);
router.delete('/airplane/:id', AirplaneController.destroy);

module.exports = router;