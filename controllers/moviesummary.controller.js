myApp.controller('MovieSummaryController', ['$scope', '$location', 'searchService', function ($scope, $location, searchService) {
    $scope.selectedMediaCard = searchService.selectedMediaCard;
    $scope.media = searchService.media;
    $scope.pageNumber = searchService.pageNumber;
    $scope.search = searchService.search;
    $scope.verifyPoster = searchService.verifyPoster;

    $scope.backToMain = function () {
        $location.path('/');
    }
}]);