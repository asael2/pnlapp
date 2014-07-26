'use strict';

module.exports = {
    db: 'mongodb://localhost/vivebien-dev',
    app: {
        title: 'vivebien - Development Environment'
    },
    facebook: {
        clientID: process.env.FACEBOOK_ID || '794350477275957',
        clientSecret: process.env.FACEBOOK_SECRET || 'de36e2331136602ef0abe0536c10b27b',
        callbackURL: 'http://localhost:3000/auth/facebook/callback'
        // callbackURL: '/#!/learn'
    },
    twitter: {
        clientID: process.env.TWITTER_KEY || 'D6HXtaVQWpQqH4sgJMCY3QZyi',
        clientSecret: process.env.TWITTER_SECRET || '0wdmvfMBDDBl7PjSNhPuTZ6W0r7nZ804eYxyEg4JPjuJ53nXKh',
        callbackURL: 'http://localhost:3000/auth/twitter/callback'
        // callbackURL: '/#!/learn'
    },
    google: {
        clientID: process.env.GOOGLE_ID || '778869874780-h26u137oscm4qq46iacud32avd072rnn.apps.googleusercontent.com',
        clientSecret: process.env.GOOGLE_SECRET || 'cz4VVe9Yi4RWLYu5_eugzQq_',
        callbackURL: 'http://localhost:3000/auth/google/callback'
        // callbackURL: '/#!/learn'
    },
    linkedin: {
        clientID: process.env.LINKEDIN_ID || '75iyy36awg1ms6',
        clientSecret: process.env.LINKEDIN_SECRET || 'r5Nb9EPDPl0HPBSw',
        // callbackURL: 'http://localhost:3000/auth/linkedin/callback'
    }
};