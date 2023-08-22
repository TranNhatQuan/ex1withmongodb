var mongoose = require('mongoose');

var accountSchema = mongoose.Schema({
    username: {
        type: String,
        default: 'No Name',
        unique: true,
    },
    password: {
        type: String,
        default: 'No Type'
    },
    forgot: {
        type: String,
        default: 'No Forgot'
    },
});

module.exports = mongoose.model('account', accountSchema, 'account');
