'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Emodule Schema
 */
var EmoduleSchema = new Schema({

    name: {
        type: String,
        trim: true,
        default: ''
    },
    parent: {
        type: String,
        trim: true,
        default: ''
    },
    child: {
        type: String,
        trim: true,
        default: ''
    },
    status: {
        type: String,
        trim: true,
        default: ''
    },
    categories: {
        type: Array,
        default: ''
    },
    articlesArray: {
        type: Array,
        default: ''
    },
    descripcion: {
        type: String,
        default: ''
    }

});

mongoose.model('Emodule', EmoduleSchema);