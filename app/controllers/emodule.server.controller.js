'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Emodule = mongoose.model('Emodule'),
    _ = require('lodash');
console.log("Emodule:: " + Emodule);
/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
    var message = '';

    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'Article already exists';
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
 * Create a module
 */
exports.create = function(req, res) {
    var emodule = new Emodule(req.body);
    // article.user = req.user;

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
 * Show the current Emodule server
 */
exports.read = function(req, res) {

};

/**
 * Update a Emodule server
 */
exports.update = function(req, res) {

};

/**
 * Delete an Emodule server
 */
exports.delete = function(req, res) {

};

/**
 * List of Emodule servers
 */
exports.list = function(req, res) {

};