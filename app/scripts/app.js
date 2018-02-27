(function() {
    function config($stateProvider, $locationProvider) {
        /* $locationProvider, part of Angular's core, configures an
        application's paths and how the application will handle URLs
        in the browser.

        $stateProvider, a component of UI-router, will determine
        the number of properties for a state. It configures the state
        behavior.
            states in our bloc jams app: name, URL route, controller,
            and template.*/
        $locationProvider
            .html5Mode({
                enabled: true,
                requireBase: false
            });

        /* $stateProvider calls .state(), which takes two arguments:
        stateName (its identity) and stateConfig (an object that
        defines specific properties of the state separated by commas):
        $stateProvider.state(stateName, stateConfig) */
        $stateProvider
            .state('landing', {
                url: '/',
                controller: 'LandingCtrl as landing',
                templateUrl: '/templates/landing.html'
            })
            /* $stateProvider.state() returns $stateProvider, so we
            are able to call state() again without having to reference
            the $stateProvider variable, with a semicolon at the end of
            each call. This is called chaining. We've put the state() 
            calls on their own line. Because we removed the semicolon
            from the first state() call, JavaScript will look to the
            next line for a continuation. When chaining method calls,
            it is common to see each call happen own its own line.*/
            .state('album', {
                url: '/album',
                controller: 'AlbumCtrl as album'
                templateUrl: '/templates/album.html'
            })
            .state('collection', {
                url: '/collection',
                controller: 'CollectionCtrl as collection',
                templateUrl: '/templates/collection.html'
            });
    };

    angular
        .module('blocJams', ['ui.router'])
        /* Injecting providers through the .config block allows for the
        providers to be accessible throughout the application. It should
        be on the application's root module (the app.js)  */
        .config(config);
})();
