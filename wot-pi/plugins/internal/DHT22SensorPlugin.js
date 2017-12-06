var resources = require('./../../resources/model');

var interval, sensor;
var model = resources.pi.sensors;
var pluginTName = resources.pi.sensors.temperature.name;
var pluginHName = resources.pi.sensors.humidity.name;
var localParams = {'simulate': false, 'frequency':2000};

exports.start = function(params) {
	localParams = params;
	if (localParams.simulate) {
		simulate();
	}
	else {
		connectHardware();
	}
}

exports.stop = function() {
	if (localParams.simulate) {
		clearInterval(interval);
	}
	else {
		sensor.unexport();
	}
}

function simulate() {
	interval = setInterval(function() {
		model.temperature.value = Math.floor(Math.random() * 50);
		model.humidity.value = Math.floor(Math.random() * 100);
		showValue();
	}, localParams.frequency);
	console.info('Simulated '+pluginHName+' and '+pluginTName+' sensor!');
};

function showValue() {
	console.info('Temperature: '+model.temperature.value+'  Humidity: '+model.humidity.value);
};


function connectHardware() {
	var sensorDriver = require('node-dht-sensor');
	var sensor = { 
		initialize: function() {
			return sensorDriver.initialize(22, model.temperature.gpio);
		},
		read: function() {
			var readout = sensorDriver.read();
			model.temperature.value = parseFloat(readout.temperature.toFixed(2));
			model.humidity.value = parseFloat(redout.humidity.toFixed(2));
			showValue();
			
			setTimout(function() {
				sensor.read();
			}, localParams.frequency);
		}
	}
};