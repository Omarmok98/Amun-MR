const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const firebaseAdmin = require("firebase-admin");
const firebaseServiceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT);

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



firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(firebaseServiceAccount),
  storageBucket: "amonmr-a0889.appspot.com"
});



//Defining base route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to AMUN APIs."});
});

//Injecting routes to express app.
require('./app/routes/Patient.js')(app);
require('./app/routes/Doctor.js')(app);
require('./app/routes/MedicalFacility.js')(app);
require('./app/routes/MedicalRecord.js')(app);
require('./app/routes/Clerk.js')(app);
require('./app/routes/FacilityPatient')(app);
require('./app/routes/FacilityDoctor')(app);
require('./app/routes/BloodGlucose')(app);
require('./app/routes/BloodPressure')(app);

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is listening on port " + (process.env.PORT? process.env.PORT : 3000));
});

