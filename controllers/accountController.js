const accountModel = require('../models/accountModel');
const APIFeatures = require('./../dataBaseManager/accountDbContext');

// Get all accounts
exports.getAccounts = async (req, res) => {
    try {
        const features = new APIFeatures(accountModel.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();
        const accounts = await features.query;

        res.status(200).json({
            status: 'success',
            results: accounts.length,
            data: {
                accounts
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: 'Error retrieving accounts',
            error: error.message
        });
    }
};

// Get a account by id
exports.getAccount = async (req, res) => {
    try {
        const account = await accountModel.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {
                account
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: 'Could not find account with that ID',
            error: err.message
        });
    }
};

// Create a new account
exports.createAccount = async (req, res) => {
    try {

        const newAccount = await accountModel.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                account: newAccount
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            error: err.message
        });
    }
};

// Update an account
exports.updateAccount = async (req, res) => {
    try {
        const account = await accountModel.findById(req.params.id);
        if (!account) {
            return res.status(404).json({
                status: 'fail',
                message: 'Account does not exist'
            });
        } else {
            const account = await accountModel.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            });

            res.status(200).json({
                status: 'success',
                message: 'Account updated successfully',
                data: {
                    account
                }
            });
        }
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: 'Account Not Found',
            error: err.message
        });
    }
};

// Delete an account
exports.deleteAccount = async (req, res) => {
    try {
        const account = await accountModel.findById(req.params.id);
        if (!account) {
            return res.status(404).json({
                status: 'fail',
                message: 'Account does not exist or was already deleted'
            });
        } else {
            await accountModel.findByIdAndDelete(req.params.id);
            return res.status(200).json({
                status: 'success',
                message: 'Account deleted successfully'
            });
        }
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            error: err.message
        });
    }
};