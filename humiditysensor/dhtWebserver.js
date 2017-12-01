var http = require("http");
var port = 8686;

var sensorLib = require('node-dht-sensor');
sensorLib.initialize(22, 12);

function randomInt (low, high) {
	return Math.floor(Math.random() * (high - low) + low);
}

http.createServer(function(req, res) {
	console.log('New incoming client request for ' + req.url);
	res.writeHeader(200, {'Content-Type': 'application/json'});
	switch(req.url) {
		case '/temperature' :
			res.write('{"Temperature" :' + sensorLib.read().temperature + '}');
			break;
		case '/humidity' :
			res.write('{"Humidity" :' + sensorLib.read().humidity + '}');
			break;
		default:
			res.write('{"status" : "you\'re an idiot"}');
	}
	res.end();
}).listen(port);



console.log('Server listening on http://localhost:' + port);


