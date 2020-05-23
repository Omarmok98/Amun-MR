const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// create express app
const app = express();

//Enabling all CORS
app.use(cors());
app.options('*', cors());

//Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

//Parse requests of content-type - application/json
app.use(bodyParser.json())

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
.then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log(err);
    process.exit();
});

//Defining base route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to AMUN APIs."});
});

//Injecting routes to express app.
require('./app/routes/Patient.js')(app);
require('./app/routes/Doctor.js')(app);


app.listen(process.env.PORT || 3000, () => {
    console.log("Server is listening on port " + (process.env.PORT? process.env.PORT : 3000));
});

