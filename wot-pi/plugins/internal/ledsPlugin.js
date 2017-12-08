var resources = require('./../../resources/model');
var utils = require('./../../utils/utils');

var interval, sensor, actuator1, actuator2;
var actuatorModels = {pOne : null, pTwo : null};
var model = resources.pi.actuators.leds;
var pluginName1 = resources.pi.actuators.leds.one.name;
var pluginName2 = resources.pi.actuators.leds.two.name;
var localParams = {'simulate': false, 'frequency':2000};

exports.start = function(params) {
	localParams = params;

	setupObservables();
	
	if (localParams.simulate) {
		simulate();
	}
	else {
		connectHardware();
	}
};

exports.stop = function() {
	if (localParams.simulate) {
		clearInterval(interval);
	}
	else {
		sensor.unexport();
	}
}


function switchOnOff(model, actuator, value) {
	if (!localParams.simulate) {
		actuator.write(value === true ? 1 : 0, function() {
			console.info('Changed value of %s to %s', model.name, value); 
		});
	}
};

function connectHardware() {
	var Gpio = require('onoff').Gpio;
	actuator1 = new Gpio(model.one.gpio, 'out');
	actuator2 = new Gpio(model.two.gpio, 'out');
	console.info('Hardware %s and %s actuator started!', model.one.name, model.two.name);
	
};

function simulate() {
	interval = setInterval(function() {
		actuatorModels.pOne.value = !actuatorModels.pOne.value;
		actuatorModels.pTwo.value = !actuatorModels.pTwo.value;
		showValue();
	}, localParams.frequency);
	console.info('Simulated '+pluginName1+' & '+pluginName2+' started!');
};

function showValue() {
	console.info(pluginName1+': '+model.one.value+'    '+pluginName2+': '+model.two.value);
};

function setupObservables() {
	actuatorModels.pOne = utils.createObservable(model.one, function(target, key, value) {
		console.info('Setting %s %s to %s', model.one.name, key, value);
		switchOnOff(model.one, actuator1, value);
	});
	exports.pOne = actuatorModels.pOne;

	actuatorModels.pTwo = utils.createObservable(model.two, function(target, key, value) {
		console.info('Setting %s %s to %s', model.two.name, key, value);
		switchOnOff(model.two, actuator2, value);
	})
	exports.pTwo = actuatorModels.pTwo;
}