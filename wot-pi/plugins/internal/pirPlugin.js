var resources = require('./../../resources/model'),
	observables = require('./../../resources/observables'),
	utils = require('./../../utils/utils');

var interval, sensor;
var model = observables.pi.sensors.pir;
var pluginName = resources.pi.sensors.pir.name;
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

function connectHardware() {
	var Gpio = require('onoff').Gpio;
	sensor = new Gpio(model.gpio, 'in', 'both');
	sensor.watch(function (err, value) {
		if (err) exit (err);
		model.value = !!value;
		showValue();
	});
	console.info('Hardware %s sensor started!', pluginName);
};

function simulate() {
	interval = setInterval(function() {
		model.value = !model.value;
		showValue();
	}, localParams.frequency);
	console.info('Simulated %s sensor started!', pluginName)
};

function showValue() {
	console.info(model.value ? 'there is someone!' : 'not anyomore!');
};

function setupObservables() {
	model = utils.createObservable(resources.pi.sensors.pir, function(target, key, value) {
		console.info('%s %s was changed to %s', target.name, key, value);
	})
};