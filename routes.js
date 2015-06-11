'use strict';
exports.register = function (app) {
    s.get(/^\/api(?:[\/#?].*)?$/, error404);

    // Home
    s.get('/', c.home.index);

    // Catch all
    s.get('*', app.lib.controller.catchAll);


};
