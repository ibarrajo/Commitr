/* Filters */
'use strict';

angular.module('commitr.filters', [])
    .filter('commit_img_resize', [function() {
    return function(url) {
        return (url === null) ? '' : url + 'size=100';
    };
}])
.filter('time_to_local', [function() {
    return function(time) {
        var d = new Date(time);
        return d.toLocaleString();
    };
}]);
