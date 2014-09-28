module.exports = {
    title: function(title) {
        return (title) ? title + ' | ' : '';
    },
    bodyClass: function(page) {
        return 'l-view-' + page;
    }
};
