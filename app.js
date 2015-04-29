var express = require('express');
var app = express();
var morgan = require('morgan');
app.use(morgan('dev'));
var swig = require('swig');
var socketio = require('socket.io');
var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
var server = app.listen(3000);
var io = socketio.listen(server);
var routes = require('./routes/');
// app.use('/', routes);
app.use( '/', routes(io) );
app.use(express.static(__dirname + '/public'));



app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', swig.renderFile);
swig.setDefaults({ cache: false });

// var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
// res.render( 'index', {title: 'Hall of Fame', people: people} );

// app.get('/', function (req, res) {
//   // res.send('Hello World!');
//   var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
//   res.render( 'index', {title: 'Hall of Fame', people: people} );
// });

// var server = app.listen(3000, function () {
//   var host = server.address().address;
//   var port = server.address().port;

//   console.log('Example app listening at http://%s:%s', host, port);
// });


