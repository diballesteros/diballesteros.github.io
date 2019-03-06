myApp.controller('MainController', ['$scope', 'searchService', '$location', 'apiSearchByTitle', 'apiSearchByID',
    function ($scope, searchService, $location, apiSearchByTitle, apiSearchByID) {

        // Cadena regex para validar que no contenga characteres especiales
        $scope.regex = /^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$/;

        // Inicializar variables y watchers del searchService service
        $scope.selectedMediaCard = searchService.selectedMediaCard;
        $scope.media = searchService.media;
        $scope.pageNumber = searchService.pageNumber;
        $scope.activeDisplay = searchService.activeDisplay;
        $scope.search = searchService.search;
        $scope.verifyPoster = searchService.verifyPoster;

        $scope.$watch('selectedMediaCard', function () {
            searchService.selectedMediaCard = $scope.selectedMediaCard;
        });

        $scope.$watch('media', function () {
            searchService.media = $scope.media;
        });

        $scope.$watch('activeDisplay', function () {
            searchService.activeDisplay = $scope.activeDisplay;
        })

        $scope.$watch('pageNumber', function () {
            searchService.pageNumber = $scope.pageNumber;
        });

        $scope.$watch('search', function () {
            searchService.search = $scope.search;
        });


        $scope.searchMedia = function (indicator) { // Llamar https://www.omdbapi.com/ para el array de peliculas o series

            // Dependiendo de la pestaña elegida, consultar para peliculas o series
            apiSearchByTitle.searchByTitle($scope.activeDisplay ? "movie" : "series", $scope.search, $scope.pageNumber).$promise.then(function (results) {
                if (results.Response === "False" && indicator === 0) { // Mostrar Mensaje si no encuentra resultados por busqueda normal
                    $scope.searchError = "No movie or series found!";
                    $scope.showSearchError = true;
                } else if(results.Response === "False" && indicator === 1){ //Si lllega mostrar todos los resultados por scrolling, salir de la funcion
                   return;
                } 
                else {
                    results.Search.slice(0, 9).forEach(function (i) { // Traer los primeros nueve resultados
                        apiSearchByID.searchByID(i.imdbID).$promise.then(function (resultstwo) { // Llamar el API otra vez pero por ID para obtener detalles de cada serie/pelicula
                            $scope.media.push(resultstwo);
                        }).catch(function (error) {
                            $scope.searchError = "Unknown error. Refresh the starting page.";
                            $scope.showSearchError = true;
                        })
                    })
                }
            }).catch(function (response) { // Mostrar mensaje si hay error con la peticion
                $scope.searchError = "Unknown error. Refresh the starting page.";
                $scope.showSearchError = true;
            })
        }

        $scope.showMediaDetails = function (card) { // Inicializar variable selectedMediaCard con detalles de la pelicula/serie seleccionado y navegar al route respectivo
            $scope.selectedMediaCard = card;
            if ($scope.activeDisplay) {
                $location.path('/movieSummary/' + card.imdbID);
            }
            else {
                $location.path('/tvSummary/' + card.imdbID);
            }
        }

        $scope.threeActors = function (actors) { // Traer solo 3 actores para el tooltip
            return actors.split(',').slice(0, 3).join(',');
        }

        $scope.resetMedia = function (bool) { // Limpiar registros para cambio de pelicula a seria o nueva busqueda
            $scope.activeDisplay = bool;
            $scope.media = [];
            $scope.showSearchError = false;
            $scope.pageNumber = 1;
        }

        $scope.incrementPage = function () { // Aumentar la pagina para la consulta del API
            $scope.pageNumber++;
        }

    }]);

