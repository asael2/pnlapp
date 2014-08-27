'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users'),
    emodule = require('../../app/controllers/emodule');

module.exports = function(app) {
    // Article Routes
    app.route('/emodules')
        .get(emodule.list)
        .post(users.requiresLogin, emodule.create);

    // app.route('/learn')
    //     .get(emodule.list)
    //     .post(users.requiresLogin, emodule.create);
    app.route('/emodules/:emoduleId')
        .get(emodule.read)
        .put(users.requiresLogin, emodule.hasAuthorization, emodule.update)
        .delete(users.requiresLogin, emodule.hasAuthorization, emodule.delete);

    // app.route('/learnarticle/:articleId')
    //     .get(emodule.read)
    //     .put(users.requiresLogin, emodule.hasAuthorization, emodule.update);

    // Finish by binding the article middleware
    app.param('emoduleId', emodule.emoduleByID);
};