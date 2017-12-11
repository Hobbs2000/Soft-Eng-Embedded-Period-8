var express = require('express'),
	router = express.Router(),
	resources = require('./../resources/model');

	
router.route('/').get(function (req, res, next) {
	//res.send(resources.pi.sensors);
	req.result = resources.pi.sensors;
	next();	
});
router.route('/pir').get(function (req, res, next) {
	//res.send(resources.pi.sensors.pir);
	req.result = resources.pi.sensors.pir;
	next();
})
router.route('/temperature').get(function (req, res, next) {
	//res.send(resources.pi.sensors.temperature);
	req.result = resources.pi.sensors.temperature;
	next();
});
router.route('/humidity').get(function (req, res, next) {
	//res.send(resources.pi.sensors.humidity);
	req.result = resources.pi.sensors.humidity;
	next();
});

module.exports = router;
	