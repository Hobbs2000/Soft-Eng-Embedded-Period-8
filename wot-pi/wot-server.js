var httpServer = require('./servers/http'),
	resources = require('./resources/model'),
	ledsPlugin = require('./plugins/internal/ledsPlugin'),
	pirPlugin = require('./plugins/internal/pirPlugin'),
	dhtPlugin = require('./plugins/internal/DHT22SensorPlugin');

pirPlugin.start({'simulate' : true, 'frequency' : 2000});
dhtPlugin.start({'simulate' : true, 'frequency' : 2000});
//ledsPlugin.start({'simulate' : true, 'frequency' : 2000});

var server = httpServer.listen(resources.pi.port, function() {
	console.info('Your WoT Pi is up and running on port %s', resources.pi.port);
});