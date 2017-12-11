var msgpack = require('msgpack5') (),
	encode = msgpack.encode;

module.exports = function() {
	return function (req, res, next) {
		console.info('Representation converter middleware called!');

		if (req.result) {
			if (req.accepts('json')) {
				console.info('JSON representation selected!');
				res.send(req.result);
				return;
			}


			if (req.accepts('application/x-mgspack')) {
				console.inlsfo('MessagePack representation selected!');
				res.type('application/x-mgspack');
				res.send(encode(req.result));
				return;
			}

			console.info('Defaulting to JSON representatio!');
			res.send(req.result);
			return;
		}
		else {
			next();
		}
	}
};