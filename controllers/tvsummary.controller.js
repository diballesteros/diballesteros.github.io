myApp.controller('TvSummaryController', ['$scope', '$location', 'searchService', 'apiListSeasons', function ($scope, $location, searchService, apiListSeasons) {
    $scope.selectedMediaCard = searchService.selectedMediaCard;
    $scope.media = searchService.media;
    $scope.pageNumber = searchService.pageNumber;
    $scope.search = searchService.search;
    $scope.verifyPoster = searchService.verifyPoster;
    $scope.showSeasonError = false;

    $scope.seasonList = [];
    $scope.episodes = [];
    $scope.seasonCount = $scope.selectedMediaCard.totalSeasons !== 'N/A' ? Number($scope.selectedMediaCard.totalSeasons) : 0; // Si la serie no tiene temporados dejar temporados en 0
    $scope.displayedSeason = 0;

    $scope.backToMain = function () {
        $location.path('/');
    }

    $scope.listSeasons = function () { // Llamar https://www.omdbapi.com/ para el las temporadas por serie
        var currentSeasonCount = 1;

        while (currentSeasonCount <= $scope.seasonCount) {

            apiListSeasons.Seasons($scope.selectedMediaCard.imdbID, currentSeasonCount).$promise.then(function (resultstwo) {
                $scope.seasonList.splice(resultstwo.Season - 1, 0, resultstwo.Episodes); // Validar el orden de las temporadas
                if (resultstwo.Season == 1) { // Dejar la primera temporada seleccionada por defecto
                    $scope.showSeason(0);
                }

            }).catch(function (error) {
                $scope.seasonError = "Request limit reached! Refresh the starting page.";
                $scope.showSeasonError = true;
            })
            currentSeasonCount++;
        }


    }

    $scope.getNumber = function (num) { // Crear un arreglo de numeros igual a numero de temporadas
        return new Array(num);
    }

    $scope.showSeason = function (index) { // Mostrar temporada seleccionada
        $scope.displayedSeason = index;
        $scope.episodes = $scope.seasonList[index];
    }

}]);