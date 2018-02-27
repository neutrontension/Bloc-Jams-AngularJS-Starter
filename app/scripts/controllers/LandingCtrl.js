(function() {
    function LandingCtrl() {
        this.heroTitle = "Turn the Music Up!";
    };

    angular
        .module('blocJams')
        .controller('LandingCtrl', LandingCtrl);
})();

/* The .controller() method has two parameters:

The name of the controller.
A callback function or an array that injects
dependencies, with a callback function as the
last item in the array. */
