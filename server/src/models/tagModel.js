const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    tag: { type: String, required: true },
    postIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'post' }]
}, {
    timestamps: { currentTime: () => new Date(Date.now() + (7 * 60 * 60 * 1000)) },
});

const tag = mongoose.model('tag', tagSchema);

tag.create(
    { tag: "Tâm sự", postIds: [] },
    { tag: "Thư dãn cuối ngày", postIds: [] },
    { tag: "Sức khỏe", postIds: [] },
    { tag: "Đời sống", postIds: [] },
  );

module.exports = tag;