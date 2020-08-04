const MedicalFacility = require("../models/MedicalFacility");
const jwt = require("jsonwebtoken");

const _cleanMedicalFacility = (medicalFacility) => {
    delete medicalFacility["__v"];
    delete medicalFacility["password"];
    delete medicalFacility["description"];
    delete medicalFacility["createdAt"];
    delete medicalFacility["updatedAt"];
    return medicalFacility;
}

exports.createMedicalFacility = async (req,res) => {
    try
    {
        const medicalFacility = (await MedicalFacility.create(req.body)).toJSON();
        _cleanMedicalFacility(medicalFacility)

        return res.send({success: true, medicalFacility});

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
        const medicalFacility = await MedicalFacility.findOne({$or: [{username}, {email}]}).lean();
        if(medicalFacility && password === medicalFacility.password)
        {
            _cleanMedicalFacility(medicalFacility);
            medicalFacility.accountType = "MEDICAL_FACILITY";
            medicalFacility.token = jwt.sign(medicalFacility, process.env.JWT_SECRET);
            return res.send({success: true, medicalFacility});
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
        const medicalFacility = await MedicalFacility.findByIdAndUpdate(_id, req.body, {new: true}).lean();
        delete medicalFacility["__v"];
        delete medicalFacility["password"];
        console.log(medicalFacility);
        return res.send({success: true, medicalFacility});
    }
    catch(error)
    {
        return res.status(400).send({success: false, error});
    }

}

exports.findMany = async (req, res) => {
    try
    {
        const medicalFacility = MedicalFacility.find(req.query);
        return res.send({success: true, medicalFacility});
    }
    catch(error)
    {
        return res.status(400).send({success: false, error});
    }

}