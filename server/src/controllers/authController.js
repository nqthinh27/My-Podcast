const Users = require('../models/userModel');
const Likes = require('../models/likeModel');
const Histories = require('../models/historyModel');
const Saves = require('../models/saveModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = {
    // REGISTER
    register: async (req, res) => {
        try {
            const { fullName, userName, email, password } = req.body;
            let newUserName = userName.toLowerCase().replace(/ /g, '');

            const user_name = await Users.findOne({ userName: newUserName });
            if (user_name) return res.status(400).json({ msg: "This user name already exists." });

            const user_email = await Users.findOne({ email });
            if (user_email) return res.status(400).json({ msg: "This email already exists." });

            if (password.length < 6)
                return res.status(400).json({ msg: "Password must be at least 6 characters." });

            const passwordHash = await bcrypt.hash(password, 12);

            const newUserLiked = new Likes({});
            await newUserLiked.save();
            const newUserHistory = new Histories({});
            await newUserHistory.save();
            const newUserSaved = new Saves({});
            await newUserSaved.save();
            const newUser = new Users({
                fullName,
                userName: newUserName,
                email,
                password: passwordHash,
                liked: newUserLiked._id,
                saved: newUserSaved._id,
                history: newUserHistory._id,
            });
            await newUser.save();
            console.log({ newUser });
            res.json({
                msg: 'Register Successfully!',
                // access_token,
                user: {
                    ...newUser._doc,
                    password: '',
                },
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    // LOGIN
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await Users.findOne({ email });
            if (!user) {
                return res.status(400).json({ msg: 'This email does not exists.' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ msg: 'Password is incorrect.' });
            }
            const access_token = createAccessToken({ id: user._id });
            const refresh_token = createRefreshToken({ id: user._id });
            res.json({
                access_token: access_token,
                refresh_token: refresh_token,
                ...user._doc,
                password: '',
                posts: user.posts.length,
                following: user.following.length,
                followers: user.followers.length,
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    staylogged: async (req, res) => {
        try {
            const user = await Users.findById(req.user._id);
            if (!user) {
                return res.status(400).json({ msg: 'This user does not exists.' });
            }
            res.json({
                ...user._doc,
                password: '',
                posts: user.posts.length,
                following: user.following.length,
                followers: user.followers.length,
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },


    // GENERATE ACCESS TOKEN
    generateAccessToken: async (req, res) => {
        try {
            const rf_token = req.headers.token
            if (!rf_token) return res.status(400).json({ msg: "Please login now." })

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, async (err, result) => {
                if (err) return res.status(400).json({ msg: "Please login now." })

                const user = await Users.findById(result.id).select("-password")
                // .populate('followers following', 'avatar username fullname followers following')

                if (!user) return res.status(400).json({ msg: "This does not exist." })

                const access_token = createAccessToken({ id: result.id })

                res.json({
                    access_token,
                    refresh_token: rf_token,
                    ...user._doc,
                    posts: user.posts.length,
                    following: user.following.length,
                    followers: user.followers.length,
                })
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
}

module.exports = authController;