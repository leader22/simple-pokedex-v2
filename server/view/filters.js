module.exports = {
    title: function(title) {
        return (title) ? title + ' | ' : '';
    },
    joinComma: function(arr) {
        arr = arr || [];
        if (arr.length === 0) { return ''; }
        return ',' + arr.join(',');
    }
};
