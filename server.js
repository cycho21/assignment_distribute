var express = require('express');
var app = express();
var fs = require('fs');
var bodyparser = require('body-parser');
var kafka_home = "/opt/kakfa_2.11-0.9.0.1/";
var kafka = require('./kafkaModule.js');

require('shelljs/global');
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());


app.listen(3030, function(){
});

app.use('/htmls', express.static(__dirname + '/htmls'));

app.route('/execute')
	.post(function(req, res) {
	kafka.startTheZookeeper();
});

app.route('/kafka')
	.post(function(req,res) {
	kafka.startServer();
});

app.route('/createTopic')
	.post(function(req,res) {
	kafka.createTopic(req.body.topicName);
	res.redirect('back');
});

app.route('/listTopic')
	.post(function(req,res) {
	kafka.listTopic();
});

app.route('/readMessage')
	.post(function(req,res) {
	kafka.readMessage(req.body.topicName);
});

app.route('/sendMessage')
	.post(function(req,res) {
	kafka.sendMessage(req.body.topicName, req.body.message);
	res.redirect('back');
});

app.route('/')
	.get(function(req, res) {
	console.log(" '/' get!");
	res.redirect("/htmls/index2.html");
});

var lsExec = function() {exec('hadoop fs -ls /', {async:false});}
