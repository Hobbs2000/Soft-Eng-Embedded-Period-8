var express =  require('express'),
	actuatorRoutes = require('./../routes/actuators'),
	sensorRoutes = require('./../routes/sensors'),
	resources = require('./../resources/model'),
	cors = require('cors');

var app = express();

app.use(cors());