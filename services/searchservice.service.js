myApp.service('searchService', function () {
    this.selectedMediaCard = {};
    this.media = [];
    this.activeDisplay = true;
    this.pageNumber = 1;
    this.search = "";

    this.verifyPoster = function (poster) {
        if (poster === 'N/A') {
            return 'images/picture-NA.jpg';
        }
        else {
            return poster;
        }
    }
});