const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const nodemailer = require('nodemailer');
const credentials = require('./credentials.js');
const ejs = require('ejs');

mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost/ProjectSafety',{useNewUrlParser:true, useUnifiedTopology: true});
mongoose.connection.once('open',function(){
	console.log("established connection with database");
}).on('error',function(err){
	console.log("Error connecting to database");
	throw err;
});

const app = express();
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({
    key: 'user_sid',
    secret: 'askjhsdkajfbajbldasjbsaf',
    resave: false,
    saveUninitialized: true
}));

const port = process.env.PORT || 3000;

const server = app.listen(port,function(err) {
	if(err)
		console.log("error setting up server");
	else
		console.log("setup server at port",port);
});

const sessAuthChecker = (req,res,next)=>{
	if(! req.session.user || !req.session.user.username){
		res.redirect('/');
	}
	else{
		next();
	}
}

app.get('/', (req,res)=>{
	res.end("home page");
});

app.get('/sendSOS',(req,res)=>{
	console.log('handle SOS');
	User.findOne({username: req.session.user.username}).then((result)=>{
		console.log("gonna send SOS");
		SOS_contacts = result.SOS_contacts;
		var transporter = nodemailer.createTransport({
		  service: 'gmail',
		  auth: {
		    user: credentials.admin_id,
		    pass: credentials.admin_password
		  }
		});
		SOS_contacts.forEach((contact_id,index)=>{
			var mailOptions = {
			  to: contact_id,
			  subject: 'Danger Alert',
			  text: `An unexpected behaviour was observed in movement of ${result.username}`
			};
			transporter.sendMail(mailOptions, function(error, info){
			  if (error) {
			    console.log(error);
			  } else {
			    console.log('Email sent: ' + info.response);
			  }
			});
		})
	}).catch((error)=>{
		console.log(error);
		res.end("error processing sos request");
	})
});

app.get('/login', (req,res)=>{
	res.sendFile(__dirname+'/public/login.html');
})

app.post('/login', (req,res)=>{
	User.findOne({
		username: req.body.username,
		password: req.body.password
	}).then((result)=>{
		if(!result){
			res.redirect('/');
		}
		else{
			req.session.user = {
				username: req.body.username
			}
			res.render('home', {username: req.body.username});
		}
	})
});

app.get('/signup', (req,res)=>{
	res.sendFile(__dirname+'/public/signup.html');
})

app.get('/dashboard', (sessAuthChecker,req,res)=>{
	res.render('home');
});

app.post('/signup', (req,res)=>{
	User.findOne({username: req.body.username}).then((result)=>{
		if(result){
			console.log('user already exists');
			res.redirect('/');
		}
		else{
			let user = new User({
				username: req.body.username,
				password: req.body.password
			});
			user.save().then(()=>{
				req.session.user = {
					username: req.body.username
				}
				res.render('home', {username: req.body.username});
			}).catch(()=>{
				console.log('cant save user');
				res.redirect('/');
			})
		}
	}).catch((err)=>{
		console.log("invalid query format");
		res.redirect('/');
	})
})

app.get('*', (req,res)=>{
	res.end('Error 404 page not found');
})