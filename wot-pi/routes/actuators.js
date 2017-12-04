var express = require('express'),
	router = express.Router(),
	resources = require('./../resources/model');

	
router.route('/').get(functions (req, res, next) {
	res.send(resources.pi.actuators);		
});
router.route('/sensors').get(functions (req, res, next) {
	res.send(resources.pi.sensors.pir);
});
router.route('/leds').get(functions (req, res, next) {
	res.send(resources.pi.actuators.leds);
});
router.route('/1').get(functions (req, res, next) {
	res.send(resources.pi.actuators.leds.1);
});
router.route('/2').get(functions (req, res, next) {
	res.send(resources.pi.actuators.leds.2);
});

module.exports = router;
	