const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3000
const users = require('./users.json')
const mysql = require('mysql');

app
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.json())
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
  
//1. Hello world API des users
// app.get('/users', (req,res) => {
    // res.send("Liste des users")
// })

//2. API static
// app.get('/users', (req,res) => {
    // res.status(200).json(users)
// })

//3. API static by id
app.get('/users/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const user = users.find(u => u.id === id)
    res.status(200).json(user)
})

//4. Dynamic API users
app.get('/bornes', (req,res) => {
	const db = mysql.createConnection({
	   host: "sql2.freemysqlhosting.net",
	   user: "sql2393753",
	   password: "nT2*qW6!",
	   database: 'sql2393753'
	});
	db.connect(function(err) {
		if (err) throw err;
		console.log("Connecté à la base de données MySQL!");
		db.query("SELECT idBorne, Lieu FROM Bornes", function (err, result) {
			console.log(result);
			res.status(200).json(result);
		});
	});
})

app.get('/bornes/1', (req,res) => {
	const db = mysql.createConnection({
	   host: "sql2.freemysqlhosting.net",
	   user: "sql2393753",
	   password: "nT2*qW6!",
	   database: 'sql2393753'
	});
	db.connect(function(err) {
		if (err) throw err;
		console.log("Connecté à la base de données MySQL!");
		db.query("SELECT Lieu FROM Bornes WHERE idBorne = 01", function (err, result) {
			console.log(result);
			res.status(200).json(result[0]);
		});
	});
})
app.get('/bornes/:id', (req,res) => {
	const id = parseInt(req.params.id)
	const db = mysql.createConnection({
	   host: "sql2.freemysqlhosting.net",
	   user: "sql2393753",
	   password: "nT2*qW6!",
	   database: 'sql2393753'
	});
	db.connect(function(err) {
		if (err) throw err;
		console.log("Connecté à la base de données MySQL!");
		db.query("SELECT Lieu FROM Bornes WHERE idBorne = "+id, function (err, result) {
			console.log(result);
			res.status(200).json(result[0]);
		});
	});
})

// get users
app.get('/users', (req,res) => {
	const db = mysql.createConnection({
	   host: "sql2.freemysqlhosting.net",
	   user: "sql2393753",
	   password: "nT2*qW6!",
	   database: 'sql2393753'
	});
	db.connect(function(err) {
		if (err) throw err;
		console.log("Connecté à la base de données MySQL!");
		db.query("SELECT * FROM users", function (err, result) {
			console.log(result);
			res.status(200).json(result);
		});
	});
}) 

//5. Update user
app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id)
	const user = req.body;
	console.log(id);
	console.log(req);
	const db = mysql.createConnection({
	   host: "sql2.freemysqlhosting.net",
	   user: "sql2392547",
	   password: "zW5%aJ9*",
	   database: 'sql2392547'
	});
	db.connect(function(err) {
		if (err) throw err;
		db.query("UPDATE users SET lastName = '" + user.lastName + "', firstName = '" + user.firstName + "' WHERE id = " + id, function (err, result) {
		});
	});
    res.status(200).json(user)
})


// inserer user 
app.post('/users', (req, res) => {
	const user = req.body;
	console.log(req);
	const db = mysql.createConnection({
	   host: "sql2.freemysqlhosting.net",
	   user: "sql2392547",
	   password: "zW5%aJ9*",
	   database: 'sql2392547'
	});
	db.connect(function(err) {
		if (err) throw err;
		db.query("INSERT INTO `users` (`Id_user`, `Lastname`, `Firstname`, `Password`, `sexe`, `poid`) VALUES ("+ user.id_user+ "," + user.firstName +','+ user.lastName +','+ user.password+','+ ',' + user.sexe+','+user.poids+")" + id, function (err, result) {
		});
	});
    res.status(200).json(user)
})

