myApp.service('apiSearchByTitle', ['$resource', function ($resource) {

    this.searchByTitle = function (type, search, page) {
        var imdbAPI = $resource('https://www.omdbapi.com/?apikey=a9565263', {
            callback: 'JSON_CALLBACK'
        }, { get: { method: "JSONP" } });

        return imdbAPI.get({ type: type, s: search, page: page });
    };
}]);

myApp.service('apiSearchByID', ['$resource', function ($resource) {

    this.searchByID = function (imdbID) {
        var imdbAPI = $resource('https://www.omdbapi.com/?apikey=a9565263', {
            callback: 'JSON_CALLBACK'
        }, { get: { method: "JSONP" } });

        return imdbAPI.get({ i: imdbID });
    };
}]);

myApp.service('apiListSeasons', ['$resource', function ($resource) {

    this.Seasons = function (imdbID, season) {
        var imdbAPI = $resource('https://www.omdbapi.com/?apikey=a9565263', {
            callback: 'JSON_CALLBACK'
        }, { get: { method: "JSONP" } });

        return imdbAPI.get({ i: imdbID, season: season });
    };
}]);

