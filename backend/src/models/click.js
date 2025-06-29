const mongoose = require('mongoose');

const clickSchema = new mongoose.Schema({
    total: {
        type: Number,
        default: 0,
        required: true
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Click', clickSchema); 