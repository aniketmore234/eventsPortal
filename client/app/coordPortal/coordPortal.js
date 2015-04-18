'use strict';

angular.module('erp2015App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('coordPortalDashboard', {
        url: '/coordPortal/dashboard',
        templateUrl: 'app/coordPortal/dashboard/dashboard.html',
        controller: 'CoordPortalDashboardCtrl',
      })
      .state('coordPortalCores', {
        url: '/coordPortal/admin',
        templateUrl: 'app/coordPortal/cores/cores.html',
        controller: 'CoordPortalCoresCtrl',
      })
      .state('coordPortalResponses', {
        url: '/coordPortal/admin/submissions/:id',
        templateUrl: 'app/coordPortal/cores/responses.html',
        controller: 'CoordPortalResponsesCtrl',
      })
      .state('coordPortalResponseDetails', {
        url: '/coordPortal/admin/application/:id',
        templateUrl: 'app/coordPortal/cores/responseDetails.html',
        controller: 'CoordPortalResponseDetailsCtrl',
      });

  });