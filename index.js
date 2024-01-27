var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var app = express();
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"))
const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://anahit:An.kalachyan425627@anahit.rgfz866.mongodb.net/sample_mflix';
app.get("/", function (req, res) {
    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error:'));
    db.once('open', async () => {
        console.log('Connected to MongoDB!');
        try {
            const mascots = await mongoose.connection.db.collection('theaters').find({ "location.address.city" : "Bloomington"},).toArray();
            res.render('../public/form.ejs', {
                info : mascots
            })
            console.log('All Movies:', allMovies);
        } catch (error) {
            console.error('Error retrieving movies:', error);
        } finally {
            mongoose.connection.close();
        }
    });
  
});

app.post("/addInfo", function (req, res) {
    const login = req.body.login;
    const password = req.body.password;
    const mail = req.body.mail;
    console.log(login, password, mail)
    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error:'));
    db.once('open', async () => {
        console.log('Connected to MongoDB!');
        try {
            const allMovies = await mongoose.connection.db.collection('users').insertOne(
                {
                    name: login,
                    email: mail,
                    password: password
                },
            );
            console.log('All Movies:', allMovies);
        } catch (error) {
            console.error('Error retrieving movies:', error);
        } finally {
            mongoose.connection.close();
        }
    });
});
app.get("/*", function (req, res) {
    res.send("404 ERROR PAGE");
});
app.listen(3000, function () {
    console.log("Example is running on port 3000");
});



