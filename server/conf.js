module.exports = (function() {
    'use strict';

    var path = require('path'),
        extend = require('extend');

    var Conf = {},
        seed = {
            base: {
                defaultPort: 9999,
                ejsSetting: {
                    root:    path.join(__dirname, '../template'),
                    layout:  '_include/wrap',
                    viewExt: 'html'
                }
            },
            development: {
                ejsSetting: {
                    cache:   false,
                    debug:   true
                }
            },
            production: {
                ejsSetting: {
                    cache:   true,
                    debug:   false
                }
            }
        };

    var env = process.env.NODE_ENV;
    Conf = extend(true, seed['base'], seed[env]);

    return Conf;
}());
