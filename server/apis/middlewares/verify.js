const jwt = require('jsonwebtoken');
const User = require('../models/User');


const verifyToken = (req, res, next) => {
    if(!req.headers.authorization) {
        return res.status(400).send({message: "unauthorize"})
    }
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=> {
        if(err) {
            
            return res.status(401).send({message: "token is invalid!"})
        }
        req.decoded = decoded;
        next();
    })
}

const verifyAdmin = async (req, res, next) => {
    const email = req.decoded.email;
    const query ={email: email};

    const user = await User.findOne(query);
    const isAdmin = user?.role == 'admin';

    if(!isAdmin){
        return res.status(403).send({message: "forbidden access!"})
    }

    next();
};


module.exports = {
    verifyToken,
    verifyAdmin,

}