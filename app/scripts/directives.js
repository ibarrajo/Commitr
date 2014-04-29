/* Directives */
'use strict';

angular.module('commitr.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm) {
        elm.text(version);
    };
}]);
