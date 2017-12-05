var express = require('express'),
	router = express.Router(),
	resources = require('./../resources/model');

	
router.route('/').get(function (req, res, next) {
	res.send(resources.pi.actuators);		
});
router.route('/leds').get(function (req, res, next) {
	res.send(resources.pi.actuators.leds);
})
router.route('/leds/one').get(function (req, res, next) {
	res.send(resources.pi.actuators.leds.one.name+". "+
				"Value: "+resources.pi.actuators.leds.one.value);
})
router.route('/leds/two').get(function (req, res, next) {
	res.send(resources.pi.actuators.leds.two.name+". "+
				"Value: "+resources.pi.actuators.leds.two.value);
})

module.exports = router;