var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var app = express();
app.set('view engine', 'ejs')
const { ObjectId } = require('mongoose').Types;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"))
const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://anahit:An.kalachyan425627@anahit.rgfz866.mongodb.net/tumo_database';

app.get("/", function (req, res) {
    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error:'));
    db.once('open', async () => {
        console.log('Connected to MongoDB!');
        try {
            const mascots = await mongoose.connection.db.collection('users').find().toArray();
            res.render('../public/form.ejs', {
                info : mascots
            })
        } catch (error) {
            console.error('Error retrieving movies:', error);
        } finally {
            mongoose.connection.close();
        }
    });
  
});

app.post("/addInfo", function (req, res) {
    const fullname = req.body.fullname;
    const accounttype = req.body.accounttype;
    const mail = req.body.mail;
    const password = req.body.password;
    const age = req.body.age;
    const nation = req.body.nation;

    console.log(fullname,accounttype,mail,password,age,nation)
    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error:'));
    db.once('open', async () => {
        console.log('Connected to MongoDB!');
        try {
            const values = await mongoose.connection.db.collection('users').insertOne(
                {
                    name: fullname,
                    accounttype: accounttype,
                    email: mail,
                    password: password,
                    age: age,
                    nation: nation,
                },
            );
            console.log('values are:', values);
        } catch (error) {
            console.error('Error retrieving values:', error);
        } finally {
            mongoose.connection.close();
        }
    });
});
app.get("/delete/:id", function (req, res) {
    var id = req.params.id;
       mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
       const db = mongoose.connection;
       db.on('error', console.error.bind(console, 'Connection error:'));
       db.once('open', async () => {
           try {
               let result = await mongoose.connection.db.collection('users').deleteOne({_id: new ObjectId(id)});
               res.redirect("/")
           } catch (error) {
               console.error('Error retrieving movies:', error);
           } finally {
               mongoose.connection.close();
           }
       })
   });
   app.get("/update/:id", function (req, res) {
    var id = req.params.id;
    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error:'));
    db.once('open', async () => {
        try {
            let result = await mongoose.connection.db.collection('users').findOne({_id: new ObjectId(id)});
            res.render('../public/update.ejs', {
                obj: result
            });
        } catch (error) {
            console.error('Error retrieving data:', error);
        } finally {
            mongoose.connection.close();
        }
    })
});


app.post("/updateData", function (req, res) {
    const fullname = req.body.fullname;
    const accounttype = req.body.accounttype;
    const mail = req.body.mail;
    const password = req.body.password;
    const age = req.body.age;
    const nation = req.body.nation;
    const id = req.body.id;

    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'Connection error:'));

    db.once('open', async () => {
        console.log('Connected to MongoDB!');

        try {
            let result = await mongoose.connection.db.collection('users').updateOne(
                { _id: new ObjectId(id) },
                { $set: {  
                    name: fullname,
                    accounttype: accounttype,
                    email: mail,
                    password: password,
                    age: age,
                    nation: nation } }
            );
            res.json({ res: result });
        } catch (error) {
            console.error('Error updating product:', error);
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



