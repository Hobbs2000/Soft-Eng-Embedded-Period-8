var sensorLib = require('node-dht-sensor');
sensorLib.initialize(22, 12);
var interval = setInterval(function () {
	read();
}, 1000);

function read() {
	var readout = sensorLib.read();
	console.log('Temperature: ' + readout.temperature.toFixed(3) + 'C, ' +
	  'humidity: ' + readout.humidity.toFixed(3) + '%');
};