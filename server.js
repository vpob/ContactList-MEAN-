var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('cList', ['list']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/contactlist', function(req, res){
	
	db.list.find(function(err, docs){
		res.json(docs);
	});
});

app.post('/contactlist', function(req, res){
	/*We insert data witch resive(req)
			and send back this data to controller*/
	db.list.insert(req.body, function(err, doc){
		res.json(doc);
	});
});
	/*We was send in controller params in link (:id)*/
app.delete('/contactlist/:id', function(req, res){
		var id = req.params.id; // get the parameters from string-link
	db.list.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});

app.get('/contactlist/:id', function(req, res){
	var id = req.params.id;
	db.list.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});

 app.put('/contactlist/:id', function(req, res){
	var id = req.params.id;
	db.list.findAndModify(
	{
		query: {_id: mongojs.ObjectId(id)}, 
		update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
		new: true
	}, function(err, doc){
		res.json(doc);
		});
});
app.listen(process.env.PORT, function(err){
	if(!err)
		console.log('Server running....');
})