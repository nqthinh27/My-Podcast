const Users = require('../models/userModel');


const followController = {
    // FOR USER
    followOther: async (req, res) => {
        try {
            const other_id = req.params.id;

            const other = await Users.findOneAndUpdate(
                { _id: other_id },
                { $push: { followers: req.user._id } },
                { new: true }
            );
            if (!other) return res.status(400).json({ msg: 'User does not exists.' });

            const user = await Users.findOneAndUpdate(
                { _id: req.user._id },
                { $push: { following: other_id } },
                { new: true }
            );
            if (!user) return res.status(400).json({ msg: 'User does not exists.' });

            res.json({
                msg: 'Followed!',
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    unFollowOther: async (req, res) => {
        try {
            const other_id = req.params.id;

            const other = await Users.findOneAndUpdate(
                { _id: other_id },
                { $pull: { followers: req.user._id } },
                { new: true }
            );
            if (!other) return res.status(400).json({ msg: 'User does not exists.' });

            const user = await Users.findOneAndUpdate(
                { _id: req.user._id },
                { $pull: { following: other_id } },
                { new: true }
            );
            if (!user) return res.status(400).json({ msg: 'User does not exists.' });

            res.json({
                msg: 'Un followed!',
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
}

module.exports = followController;