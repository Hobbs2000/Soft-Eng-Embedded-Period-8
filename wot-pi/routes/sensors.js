var express = require('express'),
	router = express.Router(),
	resources = require('./../resources/model');

	
router.route('/').get(function (req, res, next) {
	res.send(resources.pi.sensors);		
});
router.route('/pir').get(function (req, res, next) {
	res.send(resources.pi.sensors.pir.name+". "+
				resources.pi.sensors.pir.description+" "+
				"Value: " + resources.pi.sensors.pir.value);
})
router.route('/temperature').get(function (req, res, next) {
	res.send(resources.pi.sensors.temperature.name+". "+
				resources.pi.sensors.temperature.description+" "+
				"Value: "+resources.pi.sensors.temperature.value);
});
router.route('/humidity').get(function (req, res, next) {
	res.send(resources.pi.sensors.humidity.name+". "+
				resources.pi.sensors.humidity.description+" "+
				"Value: "+resources.pi.sensors.humidity.value);
});

module.exports = router;
	