(function() {
    function config($stateProvider, $locationProvider) {
      /* $stateProvider, a component of UI-router, will determine
      the number of properties for a state.
          states in our bloc jams app: name, URL route, controller,
          and template.

      $locationProvider, part of Angular's core, configures an
      application's paths. */
      $locationProvider
          .html5Mode({
              enabled: true,
              requireBase: false
          });

      $stateProvider
          .state('landing', {
              url: '/',
              templateUrl: '/templates/landing.html'
            })
            .state('album', {
                url: '/album',
                templateUrl: '/templates/album.html'
            })
            .state('collection', {
                url: '/collection',
                templateUrl: '/templates/collection.html'
            });
    }

    angular
        .module('blocJams', ['ui.router'])
        .config(config);
})();
