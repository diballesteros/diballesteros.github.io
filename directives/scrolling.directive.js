angular.module('myApp').directive('scrolling', function ($document, $window) {

    return {
        restrict: 'A',
        link: function (scope, element, attr) {

            var doc = angular.element($document)[0].body;

            angular.element(window).bind("scroll", function () {

                if (($window.scrollY + $window.innerHeight - 100 >= doc.scrollHeight) && $window.scrollY > 300) { // Llamar api para cargar nuevos resultados en infinite scroll
                    scope.$apply();
                    scope.$apply(attr.scrolling);
                }
            });
        }
    };
});