// Simple pokedex v2 server
// ----------------------------------------------------------------------------
'use strict';


// Rquire modules
// ----------------------------------------------------------------------------
var koa    = require('koa'),
    router = require('koa-router'),
    render = require('koa-ejs'),
    extend = require('extend');

var Conf        = appRequire('app/conf'),
    Router      = appRequire('app/router'),
    Controller  = appRequire('app/controller'),
    ViewLocals  = appRequire('app/view/locals'),
    ViewFilters = appRequire('app/view/filters');


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
app.listen(Conf.port);
