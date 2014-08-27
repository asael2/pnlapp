'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Emodule = mongoose.model('Emodule'),
    _ = require('lodash');

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
    var message = '';

    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'Emodule already exists';
                break;
            default:
                message = 'Something went wrong';
        }
    } else {
        for (var errName in err.errors) {
            if (err.errors[errName].message) message = err.errors[errName].message;
        }
    }

    return message;
};

/**
 * Create a emodule
 */
exports.create = function(req, res) {
    var emodule = new Emodule(req.body);
    emodule.user = req.user;

    emodule.save(function(err) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(emodule);
        }
    });
};

/**
 * Show the current emodule
 */
exports.read = function(req, res) {
    res.jsonp(req.emodule);
};

/**
 * Update a emodule
 */
exports.update = function(req, res) {
    var emodule = req.emodule;

    emodule = _.extend(emodule, req.body);

    emodule.save(function(err) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(emodule);
        }
    });
};

/**
 * Delete an emodule
 */
exports.delete = function(req, res) {
    var emodule = req.emodule;

    emodule.remove(function(err) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(emodule);
        }
    });
};

/**
 * List of Emodules
 */
exports.list = function(req, res) {
    Emodule.find().sort('-created').populate('user', 'displayName').exec(function(err, emodules) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(emodules);
        }
    });
};

/**
 * Emodule middleware
 */
exports.emoduleByID = function(req, res, next, id) {
    Emodule.findById(id).populate('user', 'displayName').exec(function(err, emodule) {
        if (err) return next(err);
        if (!emodule) return next(new Error('Failed to load emodule ' + id));
        req.emodule = emodule;
        next();
    });
};

/**
 * Emodule authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
    if (req.emodule.user.id !== req.user.id) {
        return res.send(403, {
            message: 'User is not authorized'
        });
    }
    next();
};