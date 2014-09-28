module.exports = {
    entry: {
        main: './client/main',
    },
    output: {
        path:     __dirname + "/static/js",
        filename: '[name].js'
    }
};
