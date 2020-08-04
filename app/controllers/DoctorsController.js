const Doctor = require("../models/Doctor");
const jwt = require("jsonwebtoken");

const _cleanDoctor = (doctor) => {
    delete doctor["__v"];
    delete doctor["password"];
    delete doctor["bio"];
    delete doctor["createdAt"];
    delete doctor["updatedAt"];
    return doctor;
}

exports.createDoctor = async (req,res) => {
    try
    {
        const doctor = (await Doctor.create(req.body)).toJSON();
        _cleanDoctor(doctor)

        return res.send({success: true,doctor});

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
        const doctor = await Doctor.findOne({$or: [{username}, {email}]}).lean();
        if(doctor && password === doctor.password)
        {
            _cleanDoctor(doctor);
            doctor.accountType = "DOCTOR";
            doctor.token = jwt.sign(doctor, process.env.JWT_SECRET);
            return res.send({success: true, doctor});
        }
        else
        {
            return res.status(400).send({success: false, error: "Invalid username/password"});
        }
    }
    catch(error)
    {
        console.log(error);
        return res.status(400).send({success: false, error});
    }
}

exports.update = async (req, res) => {
    try
    {
        console.log("updating");
        const { _id } = req.decoded;
        const doctor = await Doctor.findByIdAndUpdate(_id, req.body, {new: true}).lean();
        delete doctor["__v"];
        delete doctor["password"];
        console.log(doctor);
        return res.send({success: true, doctor});
    }
    catch(error)
    {
        return res.status(400).send({success: false, error});
    }

}
exports.findMany = async (req, res) => {
    try
    {
        const { _id , accountType} = req.decoded;
        if(accountType == "DOCTOR"){
            
            const doctor = await Doctor.findById(_id).lean();
            delete doctor["__v"];
            delete doctor["password"];
            return res.send({success: true, doctor});
        }
        else {
            
            const doctor = await Doctor.find(req.query).lean();
            delete doctor["__v"];
            delete doctor["password"];
            return res.send({success: true, doctor});
        }
    }
    catch(error)
    {
        return res.status(400).send({success: false, error});
    }
    

}