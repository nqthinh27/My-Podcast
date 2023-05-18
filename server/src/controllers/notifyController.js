const Notifies = require('../models/notifyModel');

const notifyController = {
    createNotify: async (req, res) => {
        try {
            const sender = req.user._id;
            const { recipient, content, image } = req.body;

            const notify = new Notifies({
                sender, recipient, content, image
            });

            await notify.save();
            return res.status(200).json({ notify });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    // removeNotify: async (req, res) => {
    //     try {
    //         const notify = await Notifies.findOneAndDelete({
    //             id: req.params.id, url: req.query.url
    //         })

    //         return res.json({notify})
    //     } catch (err) {
    //         return res.status(500).json({msg: err.message})
    //     }
    // },
    getNotifies: async (req, res) => {
        try {
            const notifies = await Notifies.find({ recipient: req.user._id })
                .sort('-createdAt')
            // .populate('user', 'avatar username')
            return res.status(200).json({ notifies });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    readedNotifies: async (req, res) => {
        try {
            await Notifies.updateMany({}, { isRead: true });
            res.status(200).json({ msg: 'Đã cập nhật thành công'});
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    }
}


module.exports = notifyController;