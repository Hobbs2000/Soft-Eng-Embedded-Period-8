var resources = require('./../../resources/model');
var utils = require('./../../utils/utils');

var interval, sensor;
var model = resources.pi.actuators.leds;
var pluginName1 = resources.pi.actuators.leds.one.name;
var pluginName2 = resources.pi.actuators.leds.two.name;
var localParams = {'simulate': false, 'frequency':2000};

exports.start = function(params) {
	localParams = params;

	var pOne = utils.createObservableCustom(model.one, function(value) {
		switchOnOff(model, value);
	});
	var pTwo = utils.createObservableCustom(model.one, function(value) {
		switchOnOff(model, value);
	});
	var allActuators = {pOne : pOne, pTwo : pTwo};
	if (localParams.simulate) {
		simulate(allActuators);
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


function switchOnOff(model, value) {
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

function simulate(actuators) {
	interval = setInterval(function() {
		actuators.pOne.value = !actuators.pOne.value;
		actuators.pTwo.value = !actuators.pTwo.value;
		showValue();
	}, localParams.frequency);
	console.info('Simulated '+pluginName1+' & '+pluginName2+' started!');
};

function showValue() {
	console.info(pluginName1+': '+model.one.value+'    '+pluginName2+': '+model.two.value);
};