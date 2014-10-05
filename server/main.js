// Simple pokedex v2 server
// ----------------------------------------------------------------------------
module.exports = function(port) {
'use strict';


// Rquire modules
// ----------------------------------------------------------------------------
var koa    = require('koa'),
    router = require('koa-router'),
    render = require('koa-ejs'),
    extend = require('extend');

var Conf        = appRequire('server/conf'),
    Router      = appRequire('server/router'),
    Controller  = appRequire('server/controller'),
    ViewLocals  = appRequire('server/view/locals'),
    ViewFilters = appRequire('server/view/filters');


// Use modules
// ----------------------------------------------------------------------------
var app = koa();
app.use(router(app));
render(app, extend(Conf.ejsSetting, {
    locals:  ViewLocals,
    filters: ViewFilters
}));


// Bind route and controller
// ----------------------------------------------------------------------------
Object.keys(Router).forEach(function(key) {
    var prop = key.split('@'),
        method = prop[0],
        route  = prop[1];

    app[method](route, Controller[Router[key]]);
});


// Start server
// ----------------------------------------------------------------------------
app.listen(port);

};
