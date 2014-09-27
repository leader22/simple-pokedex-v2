// Simple pokedex v2 server
// ----------------------------------------------------------------------------
'use strict';


// Rquire modules
// ----------------------------------------------------------------------------
var path = require('path');

var koa    = require('koa'),
    router = require('koa-router'),
    render = require('koa-ejs'),
    extend = require('extend');

var Conf        = require(path.join(__dirname, 'conf')),
    Router      = require(path.join(__dirname, 'router')),
    Controller  = require(path.join(__dirname, 'controller')),
    ViewLocals  = require(path.join(__dirname, 'view/locals')),
    ViewFilters = require(path.join(__dirname, 'view/filters'));


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
