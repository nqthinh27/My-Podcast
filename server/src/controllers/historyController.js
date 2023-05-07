const Histories = require('../models/historyModel');

const historyController = {
    getUserHistory: async (req, res) => {
        try {
            const userHistoryId = req.user.history.toString();
            const userHistory = await Histories.findById(userHistoryId).populate({
                path: 'history',
                select: '_id title owner',
                populate: {
                    path: 'owner',
                    select: 'userName fullName avatar'
                }
            });
            if (!userHistory) return res.status(400).json({ msg: 'User doest not exist or not logged in' });
            res.status(200).json(userHistory);
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    addToHistory: async (req, res) => {
        try {
            const userHistoryId = req.user.history.toString();
            const userHistory = await Histories.findById(userHistoryId);
            if (!userHistory) return res.status(400).json({ msg: 'User doest not exist or not logged in' });
            const historyLength = userHistory.history.length;
            if (historyLength == 50) {
                userHistory.history.pop();
            }
            if (userHistory.history.includes(req.params.id)) {
                userHistory.history.pull(req.params.id);
            }
            userHistory.history.push({
                $each: [req.params.id],
                $position: 0,
            });
            await userHistory.save();
            res.status(200).json({ msg: 'Saved post to history!' })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    removeFromHistory: async (req, res) => {
        try {
            const userHistoryId = req.user.history.toString();
            const userHistory = await Histories.findOneAndUpdate({ _id: userHistoryId }, {
                $pull: { history: req.params.id }
            }, { new: true })
            if (!userHistory) return res.status(400).json({ msg: 'This post does not exist.' })

            res.status(200).json({ msg: 'Un save post from history!' })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    removeMutipleFromHistory: async (req, res) => {
        const ids = req.body.ids;
        try {
            const userHistoryId = req.user.history.toString();
            const userHistory = await Histories.findOneAndUpdate(
                { _id: userHistoryId },
                { $pull: { history: { $in: ids } } },
                { new: true }
            );
            if (!userHistory) {
                return res.status(400).json({ msg: 'This post does not exist.' });
            }
            res.status(200).json({ msg: 'Un save posts from history!' });
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = historyController;