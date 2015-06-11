'use strict';
exports.register = function (app) {
    s.get(/^\/api(?:[\/#?].*)?$/, error404);

    // Home
    s.get('/', c.home.index);
    s.get('/express', c.home.express);
    s.get('/page', c.home.page);
    s.get('/task', c.home.task);

    // Auth
    s.get('/auth/spotify', c.auth.spotify);
    s.get('/auth/spotify/callback', c.auth.spotifyCallback);
    // Status
    s.get('/status', c.status.index);
    s.get('/status/health', c.status.health);

    // Catch all
    s.get('*', app.lib.controller.catchAll);


};
