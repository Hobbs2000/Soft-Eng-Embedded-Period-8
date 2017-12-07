var express = require('express'),
	router = express.Router(),
	resources = require('./../resources/model');

	
router.route('/').get(function (req, res, next) {
	req.result = resources.pi.actuators;
	next();		
});
router.route('/leds').get(function (req, res, next) {
	req.result = resources.pi.actuators.leds;
	next();
})
router.route('/leds/one').get(function (req, res, next) {
	req.result = resources.pi.actuators.leds.one;
	next();
})
router.route('/leds/two').get(function (req, res, next) {
	req.result = resources.pi.actuators.leds.two;
	next();
})

module.exports = router;