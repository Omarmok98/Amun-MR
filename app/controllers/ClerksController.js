const Clerk = require("../models/Clerk");
const jwt = require("jsonwebtoken");

const _cleanClerk = (clerk) => {
    delete clerk["__v"];
    delete clerk["password"];
    delete clerk["createdAt"];
    delete clerk["updatedAt"];
    return clerk;
}

exports.createClerk = async (req,res) => {
    try
    {
        const { _id , accountType, maxNumberOfClerks } = req.decoded;
 

        if(accountType != "MEDICAL_FACILITY")
        {
            return res.status(403).send({success: false, error: "ACCESS FORBIDDEN"}); 
        }
        req.body.medicalFacilityId = _id;
        const clerk = (await Clerk.create(req.body)).toJSON();
        _cleanClerk(clerk);
        return res.send({success: true,clerk});

    }
    catch(error)
    {
        console.log(error);
        return res.status(400).send({success: false, error});
    }
}

exports.login = async (req, res) => {
    try
    {
        const { username, email, password } = req.body;
        const clerk = await Clerk.findOne({$or: [{username}, {email}]}).lean();
        if(clerk && password === clerk.password)
        {
            _cleanClerk(clerk);
            clerk.accountType = "CLERK";
            clerk.token = jwt.sign(clerk, process.env.JWT_SECRET);
            return res.status(400).send({success: true, clerk});
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
        const { _id } = req.decoded;
        const clerk = await Clerk.findByIdAndUpdate(_id, req.body, {new: true}).lean();
        delete clerk["__v"];
        delete clerk["password"];
        console.log(clerk);
        return res.send({success: true, clerk});
    }
    catch(error)
    {
        return res.status(400).send({success: false, error});
    }

}

exports.findMany = async (req, res) => {
    try
    {
        const clerk = Clerk.find(req.query);
        return res.send({success: true, clerk});
    }
    catch(error)
    {
        return res.status(400).send({success: false, error});
    }

}