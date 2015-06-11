/*
 * ultimate.server.express
 */

'use strict';

var _ = require('lodash'),
    express = require('express'),
    expressValidator = require('express-validator');

var _app = null,
    _server = null;

function _configure() {

    _server.configure(function () {
        _server.enable('case sensitive routing');
        _server.enable('strict routing');
        _server.set('view engine', 'hbs');
        _server.set('views', _app.dir + '/views');
        _server.use(express.compress());
        _server.use(express.bodyParser());

        _server.use(expressValidator());

        if (_.isFunction(_app.attachMiddlewares)) {
            _app.attachMiddlewares();
        }
    });

    // Routes.
    _server.configure(function () {
        _app.routes.register(_app, new Restify(_server));
    });

    // connect-errorHandler middleware.
    _server.configure('development', function () {
        _server.use(express.errorHandler({
            dumpExceptions: true,
            showStack: true
        }));
    });
}

function getServer() {
    return _server;
}

function run(app) {
    _app = app;
    _app.servers.express = exports;
    _server = express();
    _configure();
}

// Public API
exports.getServer = getServer;
exports.run = run;
