'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Article Schema
 */
var ArticleSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
        //trim: true
    },
    arType: {
        type: String
    },
    skills: {
        am: {
            type: Number
        },
        ar: {
            type: Number
        },
        cp: {
            type: Number
        },
        di: {
            type: Number
        },
        en: {
            type: Number
        },
        fa: {
            type: Number
        },
        oc: {
            type: Number
        },
        sa: {
            type: Number
        },
        tr: {
            type: Number
        },
        otr: {
            type: Number
        }
    },
    resource: {
        url: {
            type: String
        },
        description: {
            type: String
        }
    },
    status: { //0 = unread, 1 = readed, 2 = in progress.
        type: Number,
        default: 0
    }
});

mongoose.model('Article', ArticleSchema);