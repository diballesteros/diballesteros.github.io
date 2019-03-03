myApp.config(function ($routeProvider) {

    $routeProvider

        .when('/', {
            templateUrl: 'pages/main.html',
            controller: 'MainController'
        })
        .when('/movieSummary/:id', {
            templateUrl: 'pages/movie-summary.html',
            controller: 'MovieSummaryController'
        })
        .when('/tvSummary/:id', {
            templateUrl: 'pages/tv-summary.html',
            controller: 'TvSummaryController'
        })

});