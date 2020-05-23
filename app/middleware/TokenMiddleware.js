const jwt = require("jsonwebtoken");

const AuthorizeToken = (req, res, next) => {

    let token = req.headers["authorization"];
    if(token)
    {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err)
            {
                return res.status(403).send({success: false, error: "ACCESS FORBIDDEN"})
            }
            else
            {
                req.decoded = decoded;
                return next();
            }

        });
    }
    else
    {
        return res.status(403).send({success: false, error: "ACCESS FORBIDDEN"})
    }

}

module.exports = {
    AuthorizeToken
}
