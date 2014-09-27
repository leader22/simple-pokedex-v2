// Simple pokedex v2 server
// ----------------------------------------------------------------------------
'use strict';


// Require modules
// ----------------------------------------------------------------------------
var path = require('path');

var koa    = require('koa'),
    router = require('koa-router'),
    render = require('koa-ejs')
;

var Conf = require(path.join(__dirname, 'conf')),
    Util = require(path.join(__dirname, 'util'))
;


// Use modules
// ----------------------------------------------------------------------------
var app = koa();
app.use(router(app));
render(app, Conf.ejsSetting);



// Route and controller
// ----------------------------------------------------------------------------
app
    .get('/', function *(next) {
        var lang = Util.getJpOrEnByCtx(this);
        yield this.render('index', {
            lang: lang,
            title: 'SimplePokedex'
        });
    })
    .get('/about', function *(next) {
        yield this.render('about', {
            users: [{ name: 'Yuji' }, { name: 'TORU' }]
        });
    })
    .get('/list', function *(next) {
    })
    .get('/detail/:cid', function *(next) {
    })
;


// Start server
// ----------------------------------------------------------------------------
app.listen(Conf.port);
