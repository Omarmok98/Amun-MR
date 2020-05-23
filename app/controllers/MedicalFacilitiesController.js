const MedicalFacility = require("../models/MedicalFacility");
const jwt = require("jsonwebtoken");

const _cleanMedicalFacility = (MedicalFacility) => {
    delete MedicalFacility["__v"];
    delete MedicalFacility["password"];
    delete MedicalFacility["Description"];
    delete MedicalFacility["createdAt"];
    delete MedicalFacility["updatedAt"];
    return MedicalFacility;
}

exports.createMedicalFacility = async (req,res) => {
    try
    {
        const MedicalFacility = (await MedicalFacility.create(req.body)).toJSON();
        _cleanMedicalFacility(MedicalFacility)

        return res.send({success: true,MedicalFacility});

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
        const MedicalFacility = await MedicalFacility.findOne({$or: [{username}, {email}]}).lean();
        if(MedicalFacility && password === MedicalFacility.password)
        {
            _cleanDoctor(MedicalFacility);
            MedicalFacility.token = jwt.sign(MedicalFacility, process.env.JWT_SECRET);
            return res.status(400).send({success: true, MedicalFacility});
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
        const MedicalFacility = await MedicalFacility.findByIdAndUpdate(_id, req.body, {new: true}).lean();
        delete MedicalFacility["__v"];
        delete MedicalFacility["password"];
        console.log(MedicalFacility);
        return res.send({success: true, MedicalFacility});
    }
    catch(error)
    {
        return res.status(400).send({success: false, error});
    }

}