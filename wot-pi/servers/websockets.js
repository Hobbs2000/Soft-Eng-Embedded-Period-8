var express =  require('express'),
	actuatorRoutes = require('./../routes/actuators'),
	sensorRoutes = require('./../routes/sensors'),
	resources = require('./../resources/model'),
	utils = require('./../utls/utils');
var observables = {};

exports.listen = function(server) {
	var wss = new WebsocketServer({server: server});
	console.info('Websocket server started...');
	wss.on('connection', function (ws) {
		var url = ws.upgradeReq.url;
		console.info(url);
		try {
			observables[url] = utils.createObservable(selectResource(url), function (target, key, value) {
				console.info('%s %s was changed to %s', target.name, key, value);
			})
		}
	})
}