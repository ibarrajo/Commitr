/* Controllers */
'use strict';

angular.module('commitr.controllers', [])
.controller('MainCtrl', ['$scope', '$rootScope', 'GitUser', 'GitRepo', function($scope, $rootScope, GitUser, GitRepo) {
        $rootScope.currentView = 'Main';
        // some default values
        $scope.current_repo = {};
        $scope.current_commits = [];
        $scope.search_msg = '';
        $scope.current_mvp = {avatar_url: null};
        $scope.user_repos = ($scope.user_repos === null) ? [{full_name: 'test'}] : $scope.user_repos;
        $scope.handle = ($scope.handle === null) ? 'twbs' : $scope.handle;

        // check if the given string is valid
        var isRepoName = function(str) {
            var arr =  str.split(/\//g);
            // returns a boolean
            return (arr.length === 2 && arr[0].length > 0 && arr[1].length > 0);
        };

        // throttle the search box:
        $scope.$watch('searchBox.str', function (tmpStr) {
            if (!tmpStr || tmpStr.length === 0) {
                return 0;
            }

            if (!isRepoName(tmpStr)) {
                $scope.searchBox.msg = 'Invalid repo name!';
                $scope.searchBox.showMsg = true;
                return 0;
            } else {
                $scope.searchBox.msg = '';
                $scope.searchBox.showMsg = false;
            }

            setTimeout(function() {
                if (tmpStr === $scope.searchBox.str)
                {
                    GitRepo.exists(tmpStr, function(exists){
                        if(exists) {
                            $scope.loadRepo(tmpStr);
                        } else {
                            $scope.searchBox.msg = 'That repo does not exist!';
                            $scope.searchBox.showMsg = true;
                        }
                    });
                }
            }, 800);
        });

        // load the data!
        $scope.loadRepo = function(repo_name) {
            console.log('loading repo: ' + repo_name);

            GitRepo.get(repo_name, function(data) {
                $scope.current_repo = data;
            });

            GitRepo.getCommits(repo_name, function(data) {
                $scope.current_commits = data;
            });

            GitRepo.getMvp(repo_name, function(data) {
                $scope.current_mvp = data;
                $scope.handle = data.login;

                // get related repos:
                GitUser.getRepos(data.login, function(data){
                    $scope.user_repos = data;
                });
            });
        };

        // auto load 'twbs/bootstrap'
        $scope.loadRepo('twbs/bootstrap');

    }])

.controller('AboutCtrl', ['$rootScope', function($rootScope){
    $rootScope.currentView = 'About';
}])

.controller('ContactCtrl', ['$rootScope', function($rootScope){
    $rootScope.currentView = 'Contact';
}]);
