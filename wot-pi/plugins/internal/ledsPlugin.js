var resources = require('./../../resources/model'),
	observables = require('./../../resources/observables'),
    utils = require('./../../utils/utils');

var interval, sensor,
	model = observables.pi.actuators.leds,
	gpioActuators = {led1 : null, led2 : null},
	pluginName1 = model.one.name,
	pluginName2 = model.two.name,
	localParams = {'simulate': false, 'frequency':2000};

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


function switchOnOff(submodel, actuator, value) {
	if (!localParams.simulate) {
		actuator.write(value === true ? 1 : 0, function() {
			console.info('Changed value of %s to %s', submodel.name, value); 
		});
	}
};

function connectHardware() {
	var Gpio = require('onoff').Gpio;
	gpioActuators.led1 = new Gpio(model.one.gpio, 'out');
	gpioActuators.led2 = new Gpio(model.two.gpio, 'out');
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

function setupObservables() {
	model.one = utils.createObservable(resources.pi.actuators.leds.one, function(target, key, value) {
		console.info('%s %s was changed to %s', target.name, key, value);
		switchOnOff(model.one, gpioActuators.led1, value);
	});

	model.two = utils.createObservable(resources.pi.actuators.leds.two, function(target, key, value) {
		console.info('%s %s was changed to %s', target.name, key, value);
		switchOnOff(model.two, gpioActuators.led2, value);
	})

	exports.gpioActuators = gpioActuators;
}