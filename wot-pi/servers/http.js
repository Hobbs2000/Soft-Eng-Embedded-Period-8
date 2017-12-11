var express =  require('express'),
	actuatorRoutes = require('./../routes/actuators'),
	sensorRoutes = require('./../routes/sensors'),
	resources = require('./../resources/model'),
	converter = require('./../middleware/converter'),
	cors = require('cors');

var app = express();

app.use(cors());
app.use('/pi/actuators', actuatorRoutes);
app.use('/pi/sensors', sensorRoutes);
app.use(converter());
app.use('/pi', function (req, res) {
	res.send('This is the WoT-Pi!')
});


module.exports = app;
