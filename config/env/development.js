'use strict';

module.exports = {
    db: 'mongodb://localhost/mean-dev',
    app: {
        title: 'MEAN.JS - Development Environment'
    },
    facebook: {
        clientID: process.env.FACEBOOK_ID || '794350477275957',
        clientSecret: process.env.FACEBOOK_SECRET || 'de36e2331136602ef0abe0536c10b27b',
        callbackURL: 'http://localhost:3000/#!/articles'
    },
    twitter: {
        clientID: process.env.TWITTER_KEY || 'CONSUMER_KEY',
        clientSecret: process.env.TWITTER_SECRET || 'CONSUMER_SECRET',
        callbackURL: 'http://localhost:3000/auth/twitter/callback'
    },
    google: {
        clientID: process.env.GOOGLE_ID || 'APP_ID',
        clientSecret: process.env.GOOGLE_SECRET || 'APP_SECRET',
        callbackURL: 'http://localhost:3000/auth/google/callback'
    },
    linkedin: {
        clientID: process.env.LINKEDIN_ID || 'APP_ID',
        clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
        callbackURL: 'http://localhost:3000/auth/linkedin/callback'
    }
};