const Patient = require("../models/Patient");
const jwt = require("jsonwebtoken");

const _cleanPatient = (patient) => {
    delete patient["__v"];
    delete patient["password"];
    delete patient["medications"];
    delete patient["allergies"];
    delete patient["bloodType"];
    delete patient["createdAt"];
    delete patient["updatedAt"];
    delete patient["conditions"];
    return patient;
}

exports.createPatient = async (req, res) => {
    try
    {
        const patient = (await Patient.create(req.body)).toJSON();
        _cleanPatient(patient);
        return res.send({success: true, patient});
    }
    catch(error)
    {
        return res.status(400).send({success: false, error});
    }
}

exports.login = async (req, res) => {
    try
    {
        const { username, email, password } = req.body;
        const patient = await Patient.findOne({$or: [{username}, {email}]}).lean();
        if(patient && password === patient.password)
        {
            _cleanPatient(patient);
            patient.accountType = "PATIENT";
            patient.token = jwt.sign(patient, process.env.JWT_SECRET);
            return res.send({success: true, patient});
        }
        else
        {
            return res.status(400).send({success: false, error: "Invalid username/password"});
        }
    }
    catch(error)
    {
        return res.status(400).send({success: false, error});
    }
}

exports.update = async (req, res) => {
    try
    {
        const { _id } = req.decoded;
        const patient = await Patient.findByIdAndUpdate(_id, req.body, {new: true}).lean();
        delete patient["__v"];
        delete patient["password"];
        return res.send({success: true, patient});
    }
    catch(error)
    {
        return res.status(400).send({success: false, error});
    }

}
exports.findMany = async (req, res) => {
    try
    {   const { _id , accountType} = req.decoded;
        
        if(accountType == "PATIENT"){
            
            const patient = await Patient.findById(_id).lean();
            delete patient["__v"];
            delete patient["password"];
            console.log(patient);
            return res.send({success: true, patient});
        }
        else {
            
            const patient = await Patient.find(req.query).lean();
            delete patient["__v"];
            delete patient["password"];
            return res.send({success: true, patient});
        }
        
        
    }
    catch(error)
    {
        return res.status(400).send({success: false, error});
    }

}
