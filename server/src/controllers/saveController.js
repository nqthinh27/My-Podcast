const Saves = require('../models/saveModel');

const saveController = {
    getUserSaved: async (req, res) => {
        try {
            const userSaved = await Saves.findById(req.user.saved);
            if (!userSaved) return res.status(400).json({ msg: 'User doest not exist or not logged in' });
            res.status(200).json(userSaved);
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    addToSaved: async (req, res) => {
        try {
            const userSaved = await Histories.findById(req.user.saved);
            if (!userSaved) return res.status(400).json({ msg: 'User doest not exist or not logged in' });
            userSaved.saved.push({
                $each: req.params.id,
                $position: 0,
            });
            await userSaved.save();
            res.status(200).json({ msg: 'Saved post to saved list!' })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    removeFromSaved: async (req, res) => {
        try {
            const userSaved = await Histories.findOneAndUpdate({ _id: req.user.saved }, {
                $pull: { saved: req.params.id }
            }, { new: true })
            if (!userSaved) return res.status(400).json({ msg: 'This post does not exist.' })

            res.status(200).json({ msg: 'Un save post from saved list!' })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    removeMutipleFromSaved: async (req, res) => {
        const ids = req.body.ids;
        try {
            const userSaved = await Histories.findOneAndUpdate(
                { _id: req.user.saved },
                { $pull: { saved: { $in: ids } } },
                { new: true }
            );
            if (!userSaved) {
                return res.status(400).json({ msg: 'This post does not exist.' });
            }
            res.status(200).json({ msg: 'Un save posts from saved list!' });
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = saveController;