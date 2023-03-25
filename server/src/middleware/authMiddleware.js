const Users = require("../models/userModel");
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.acs_token;
        // const token = req.header("Authorization");
        if(!token) return res.status(400).json({msg: "Invalid Authentication."});

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if(!decoded) return res.status(400).json({msg: "Invalid Token."});

        const user = await Users.findOne({_id: decoded.id});
        req.user = user;
        next();
    } catch (err) {
        return res.status(500).json({msg: err.message});
    }
}

module.exports = authMiddleware