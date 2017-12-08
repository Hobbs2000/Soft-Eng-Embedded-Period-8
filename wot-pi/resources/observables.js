var resources = require('./resources.json'),
	utils = require('./../utils/utils');

var observables = {
	pi : {
		sensors :  {
			pir : utils.createObservable(resources.pi.sensors.pir, function(target, key, value) {
			}),
			temperature : utils.createObservable(resources.pi.sensors.temperature, function(target, key, value) {
			}),
			humidity : utils.createObservable(resources.pi.sensors.humidity, function(target, key, value) {
			}),
		},
		actuators : {
			leds : {
				one : utils.createObservable(resources.pi.actuators.leds.one, function(target, key, value) {
				}),
				two : utils.createObservable(resources.pi.actuators.leds.two, function(target, key, value) {
				})
			}
		}
	}
};


module.exports = observables;