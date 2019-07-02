const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const nexmo = require('./config/keys');
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
  const number = req.body.number;
  const text = req.body.text;

  // Nexmo
  nexmo.message.sendSms(
    '16209554291',
    number,
    text,
    { type: 'unicode' },
    (err, response) => {
      if (err) {
        console.log(err);
      } else {
        console.dir(response);
        //GetData from response
        const data = {
          id: response.messages[0]['message-id'],
          number: response.messages[0]['to']
        };
        //Emit to the client
        io.emit('smsStatus', data);
      }
    }
  );

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

//Connect to socket.io
const io = socketio(server);
io.on('connection', socket => {
  console.log('Connected');
  io.on('disconnect', () => {
    console.log('Disconnected');
  });
});
