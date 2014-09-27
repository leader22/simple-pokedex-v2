// Simple pokedex v2 server
// ----------------------------------------------------------------------------
'use strict';


// Require dep modules
// ----------------------------------------------------------------------------
var path = require('path');
var koa    = require('koa'),
    router = require('koa-router'),
    render = require('koa-ejs');


// Use modules
// ----------------------------------------------------------------------------
var app = koa();
app.use(router(app));
render(app, {
    root:    path.join(__dirname, 'view'),
    layout:  'template',
    viewExt: 'html',
    cache:   false
    // debug:   true,
    // locals:  locals,
    // filters: filters
});


// Route and controller
// ----------------------------------------------------------------------------
app
    .get('/', function *(next) {
        var lang = this.request.header['accept-language'].split(',')[0];
        this.body = 'Hello World! ' + lang;
    })
    .get('/about', function *(next) {
        // this.body = 'About world.';
        yield this.render('about', {
            users: [{ name: 'Yuji' }, { name: 'TORU' }]
        });
    });


// Start server
// ----------------------------------------------------------------------------
app.listen(6400);
