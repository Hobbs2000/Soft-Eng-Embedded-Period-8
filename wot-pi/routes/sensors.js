var express = require('express'),
	router = express.Router(),
	resources = require('./../resources/model');

	
router.route('/').get(functions (req, res, next) {
	res.send(resources.pi.sensors);		
});
router.route('/sensors').get(functions (req, res, next) {
	res.send(resources.pi.sensors.pir);
});
router.route('/temperature').get(functions (req, res, next) {
	res.send(resources.pi.sensors.temperature);
});
router.route('/humidity').get(functions (req, res, next) {
	res.send(resources.pi.sensors.humidity);
});

module.exports = router;
	