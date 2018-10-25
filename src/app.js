const http = require('http');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
const server = http.Server(app);
const boardController = require('./controller/BoardController');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());
app.use('/api', boardController);

server.listen(5000, function() {
	console.log('localhost:5000');
});
