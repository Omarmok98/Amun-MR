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
 
        const currNumberOfClerks = (await Clerk.find({medicalFacilityId: _id}));
        
        if(accountType != "MEDICAL_FACILITY")
        {
            return res.status(403).send({success: false, error: "ACCESS FORBIDDEN"}); 
        }
        if(currNumberOfClerks.length === maxNumberOfClerks)
        {
            return res.status(400).send({success: false, error: "MAXIMUM NUMBER OF CLERKS EXCEEDED "});

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
            return res.send({success: true, clerk});
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
        const { accountType } = req.decoded;
        if(accountType != "MEDICAL_FACILITY"){

            return res.status(403).send({success: false, error: "ACCESS FORBIDDEN"});
        
        }
        const clerk = await Clerk.findByIdAndUpdate(req.param.id, req.body, {new: true}).lean();
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
        const {_id, accountType} = req.decoded;
         if(accountType == "MEDICAL_FACILITY"){
            
            const clerks = await Clerk.find({medicalFacilityId:_id}).lean();
            return res.send({success: true, clerks});
        }else {
             const clerk = (await Clerk.find(req.query));
            return res.send({success: true, clerk});
        }
        
       
    }
    catch(error)
    {
        return res.status(400).send({success: false, error});
    }
   
}
exports.delete = async (req, res) =>{
    try
    {
        clerkId = req.params.id
        const { _id } = req.decoded; //medical Facility ID
        const medicalFacility = await Clerk.findById(clerkId).select("medicalFacilityId").lean();
        if(_id != medicalFacility.medicalFacilityId)
        {
            return res.status(403).send({success: false, error: "ACCESS FORBIDDEN"}); 
        }
        
        await Clerk.findByIdAndDelete(clerkId);
        return res.send({success: true});
    }
    catch(error)
    {
        return res.status(400).send({success: false, error});
    }
    }
    
