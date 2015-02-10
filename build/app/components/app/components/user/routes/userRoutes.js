 angular.module('throughCompanyApp').config([
   '$stateProvider',
   '$urlRouterProvider',
   function($stateProvider, $urlRouterProvider) {

     //redirect to user dashboard
     $urlRouterProvider.when('/app', '/app/user/dashboard');

     $urlRouterProvider.when('/app/user', '/app/user/dashboard');

     //user routes
     $stateProvider
       .state('system.app.user', {
         url: '/user',
         template: '<ui-view/>',
         controller: 'userController'
       })
       .state('system.app.user.dashboard', {
         url: '/dashboard',
         templateUrl: '/app/components/app/components/user/views/userDashboard.html',
         controller: 'userDashboardController'
       });
   }
 ]);
