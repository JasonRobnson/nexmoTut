const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const Nexmo = require('nexmo');
const socketio = require('socket.io');

// Init app
const app = express();

// Template Engine Setup
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

//Public Folder Setup
app.use(express.static(__dirname + '/public'));

//Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Catch form Submit
app.post('/', (req, res) => {
  res.send(req.body);
  console.log(req.body);
});

//Index Route
app.get('/', (req, res) => {
  res.render('index');
});

//Define Port
const port = 3000;

//Start Server
const server = app.listen(port, () =>
  console.log(`Server started on port${port}`)
);
