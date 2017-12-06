var resources = require('./../../resources/model');

var interval, sensor;
var model = resources.pi.actuators.leds;
var pluginName1 = resources.pi.actuators.leds.one.name;
var pluginName2 = resources.pi.actuators.leds.two.name;
var localParams = {'simulate': false, 'frequency':2000};

exports.start = function(params) {
	localParams = params;
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

function connectHardware() {
	var Gpio = require('onoff').Gpio;
	led1 = new Gpio(model.one.gpio, 'out', 'both');
	led2 = new Gpio(mode.two.gpio, 'out', 'both');
	led1.watch(function (err, value) {
		if (err) exit (err);
		model.one.value = !!value;
		showValue();
	});
	led2.watch(function (err, value) {
		if (err) exit (err);
		model.two.value = !!value;
		showValue();
	});
	console.info('Hardware '+pluginName1+' & '+pluginName2+' started!');
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