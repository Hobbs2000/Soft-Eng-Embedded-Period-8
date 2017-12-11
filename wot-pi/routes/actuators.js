var express = require('express'),
	router = express.Router(),
	resources = require('./../resources/model');
	ledsPlugin = require('./../plugins/internal/ledsPlugin');

	
router.route('/').get(function (req, res, next) {
	req.result = resources.pi.actuators;
	next();		
});
router.route('/leds').get(function (req, res, next) {
	req.result = resources.pi.actuators.leds;
	next();
})

router.route('/leds/:id').get(function(req, res, next) {
	req.result = ledsPlugin.actuatorModels[req.params.id];
	next();
}).put(function(req, res, next) {
	var selectedLed = ledsPlugin.gpioActuators[req.params.id];
	selectedLed.value = req.body.value;
	console.info('Changed LED %s value to %s', req.params.id, selectedLed.value);
	req.result = selectedLed;
	next();
})


module.exports = router;