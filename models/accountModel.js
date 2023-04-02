const mongoose = require('mongoose');

const BALANCE_MIN = 0;
const BALANCE_MAX = 999999999999;

const accountSchema = new mongoose.Schema({
    accountHolder: {
        type: String,
        required: [true, 'An account must have an account holder']
    },
    accountEmail: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (val) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(val),
            message: (props) => `${props.value} is not a valid email address!`
        }
    },
    accountNumber: {
        type: Number,
        required: [true, 'An account must have an account number']
    },
    accountNickname: {
        type: String,
        required: true,
        default: function () {
            return `${this.accountType} ${this.accountNumber.toString().slice(-4)}`;
        }
    },
    accountType: {
        type: String,
        required: [true, 'An account must have an account type'],
        enum: ['checking', 'savings', 'HYsavings'] // Only allow account types checking, savings, or High Yield Savings
    },
    accountBalance: {
        type: Number,
        required: [true, 'An account must have a balance'],
        min: [BALANCE_MIN, `Balance must be at least ${BALANCE_MIN}`], // Use a custom error message for min validation
        max: [BALANCE_MAX, `You have too much money! Maximum balance is ${BALANCE_MAX}`], // Use a custom error message for max validation
        validate: {
            validator: function (val) {
                return val >= BALANCE_MIN && val <= BALANCE_MAX;
            },
            message: props => `${props.value} is not a valid account balance! Must be between ${BALANCE_MIN} and ${BALANCE_MAX}`
        }
    },
}, {
    versionKey: false // This prevents "__v" from being added to the document
});

const accountModel = mongoose.model('account', accountSchema);

module.exports = accountModel;