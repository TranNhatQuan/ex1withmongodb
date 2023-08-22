var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: {
        type: String,
        default: 'No Name'
    },
    account: {
        type: [mongoose.Schema.Types.ObjectId],
        unique: true,
    },
    address: {
        type: String,
        default: 'No Address'
    },
    gender: {
        type: Boolean,
        default: true,
    },
    age: {
        type: Number,
        default: 0,
        min: 0,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model('user', userSchema, 'user');
