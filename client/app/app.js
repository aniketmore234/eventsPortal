'use strict';

angular.module('erp2015App', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ngFileUpload',
  'ui.bootstrap',
  'smart-table',
  'permission',
  'ngFacebook',
  'ngMaterial',
  'truncate',
  'ngMdIcons',
  'ngImgCrop'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })
  .config( function( $facebookProvider ) {
    $facebookProvider.setAppId('1630409340524916');
  })
  .run( function ($rootScope) {
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '1630409340524916',
        xfbml      : true,
        version    : 'v2.5'
      });
    };

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth, $state) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.url('/login');
        }
        if (next.access) {
          var permissions = next.access;
          var userRole = Auth.getCurrentUser().role;
          if (permissions.except) {
            if (permissions.except.indexOf(userRole) > -1) {
              $location.url('/');
            }
          } else if (permissions.allow) {
            if (permissions.allow.indexOf(userRole) < 0) {
              $location.url('/');
            }
          }
        }        
      });
    });
  });
