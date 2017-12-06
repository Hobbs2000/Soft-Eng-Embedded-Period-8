var resources = require('./../../resources/model');

var interval, sensor;
var model = resources.pi.actuators.leds;
var pluginName1 = resources.pi.actuators.leds.one.name;
var pluginName2 = resources.pi.actuators.leds.two.name;
var localParams = {'simulate': false, 'frequency':2000};

exports.start = function(params) {
	localParams = params;
	observe(model.one);
	observe(model.two);
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


function observe(what) {
	Object.observe(what, function (changes) {
		console.info('Change detected by plugin for %s...', what.name);
		switchOnOff(what, what.value); 
	});
};

function switchOnOff(what, value) {
	if (!localParams.simulate) {
		actuator.write(value === true ? 1 : 0, function() {
			console.info('Changed value of %s to %s', what.name, value); 
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
		model.one.value = !model.one.value;
		model.two.value = !model.two.value;
		showValue();
	}, localParams.frequency);
	console.info('Simulated '+pluginName1+' & '+pluginName2+' started!');
};

function showValue() {
	console.info(pluginName1+': '+model.one.value+'    '+pluginName2+': '+model.two.value);
};