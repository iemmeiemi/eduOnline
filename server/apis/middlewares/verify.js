const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verify = (req, res, next) => {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
    if (!token) {
        req.decoded = { id: null };
        return next(); // Tiếp tục đến middleware tiếp theo
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Token is invalid!" });
        }
        req.decoded = decoded;
        next();
    });
};

const verifyToken = (req, res, next) => {
    if(!req.headers.authorization) {
        return res.status(400).send({message: "unauthorize"})
    }
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=> {
        if(err) {
            return res.status(401).send({message: "token is invalid!"})
        }
        req.decoded = decoded;
        next();
    })
}

const verifyAdmin = async (req, res, next) => {
    const email = req.decoded.email;
    const query = {email: email};

    const user = await User.findOne(query);
    const isAdmin = user?.role == 'admin';

    if(!isAdmin){
        return res.status(403).send({message: "forbidden access!"})
    }
    next();
};

const verifyInstructor = async (req, res, next) => {
    try {
        const email = req.decoded.email;
        const user = await User.findOne({ email: email }, 'role _id');
        if (!user) {
            return res.status(404).send({ message: "User not found!" });
        }
        const isInstructor = user.role === 'instructor';
        if (!isInstructor) {
            return res.status(403).send({ message: "Forbidden access!" });
        }
        req.decoded = { email, userId: user._id };
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Internal server error!" });
    }
};

const verifySubmin = async (req, res, next) => {
    const email = req.decoded.email;
    const query ={email: email};

    const user = await User.findOne(query);
    const isSubmin = user?.role == 'submin';

    if(!isSubmin){
        return res.status(403).send({message: "forbidden access!"})
    }

    next();
};



module.exports = {
    verify,
    verifyToken,
    verifyAdmin,
    verifySubmin,
    verifyInstructor,

}