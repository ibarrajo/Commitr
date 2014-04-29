/* Services */
'use strict';

angular.module('commitr.services', [])

	.service('GitUser', ['$http', function($http) {

		this.getRepos = function(handle, callback) {
			var url = (handle === null) ? 'https://api.github.com/repositories?per_page=10' : 'https://api.github.com/users/' + handle + '/repos?per_page=10';
			$http.get(url).success(function(data) {
				callback(data);
			});
		};

		this.getAvatarURL = function(handle, callback) {
			$http.get('https://api.github.com/users/' + handle).success(function(data) {
				callback(data.avatar_url);
			});
		};

	}])

	.service('GitRepo', ['$http', function($http) {

		// get repo data: GET /repos/:owner/:repo
		this.get = function(full_name, callback) {
			$http.get('https://api.github.com/repos/' + full_name).success(function(data) {
				callback(data);
			});
		};

		// get commits: GET /repos/:owner/:repo/commits
		// https://developer.github.com/v3/repos/commits/
		this.getCommits = function(full_name, callback) {
			$http.get('https://api.github.com/repos/' + full_name + '/commits?per_page=10').success(function(data) {
				callback(data);
			});
		};

		// get mvp: GET /repos/:owner/:repo/contributors
		// https://developer.github.com/v3/repos/#list-contributors
		this.getMvp = function(full_name, callback) {
			$http.get('https://api.github.com/repos/' + full_name + '/contributors?per_page=1').success(function(data) {
				// return the one and only:
				callback(data[0]);
			});
		};

		this.exists = function(full_name, callback) {
			$http.get('https://api.github.com/repos/' + full_name).success(function(data) {
				// return the one and only:
				callback((data.full_name === full_name));
			}).error(function(data, status) {
				// if it's a 404, the repo does not exist
				if(status === 404) {
					callback(false);
				}
			});
		};

	}]);
