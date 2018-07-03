var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');


// database stuff
var mongo = require('mongodb');
var mongoose = require('mongoose');

var url = "mongodb://bigballer:password123@ds125821.mlab.com:25821/squadup"; // mLab link
mongoose.connect(url);
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function(){
	console.log("Database is connected");
});



// routes
var routes = require('./routes/index');

// Init App
var app = express();

/* might want to change this because we are planning on using react*/
// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));


// Express Session
app.use(session({
	secret: 'secret', // probably should change
	saveUninitialized: true,
	resave: true
}));


// Express Validador
app.use(expressValidator({
	errorFormatter: function(param, msg, value) {
		var namespace = param.split('.'),
		root = namespace.shift(),
		formParam = root;

		while(namespace.length) {
			formParam += '[' + namespace.shift() + ']';
		}

		return {
			param : formParam,
			msg   : msg,
			value : value
		};
	}
}));



// connect flash
app.use(flash());



app.use('/', routes);


// Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function() {
	console.log('Server started on port localhost:' + app.get('port'));
});
