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
         controller: 'userDashboardController',
         resolve: {
           userCompanies: ['user', 'userEntityService',
             function(user, userEntityService) {
               return userEntityService.getUserCompanies(user._id);
             }
           ]
         }
       })
       .state('system.app.user.createcompany', {
         url: '/companies/create',
         templateUrl: '/app/components/app/components/user/views/userCreateCompany.html',
         controller: 'userCreateCompanyController',
         resolve: {
           companyTypes: ['lookupEntityService',
             function(lookupEntityService) {
               return lookupEntityService.getCompanyTypes();
             }
           ],
           states: ['lookupEntityService',
             function(lookupEntityService) {
               return lookupEntityService.getStates();
             }
           ]
         }
       })
       .state('system.app.user.settings', {
         url: '/settings',
         templateUrl: '/app/components/app/components/user/views/userSettings.html',
         controller: 'userSettingsController'
       });

     //user company routes
     $stateProvider
       .state('system.app.user.company', {
         url: '/company/:companyId',
         template: '<ui-view/>',
         controller: 'userCompanyController',
         resolve: {
           company: ['$stateParams', 'userEntityService', 'user',
             function($stateParams, userEntityService, user) {
               return userEntityService.getUserCompanyById(user._id, $stateParams.companyId);
             }
           ],
           companyUsers: ['$rootScope', '$stateParams', 'authService', 'userEntityService', 'user', 'userClaims', 'company',
             function($rootScope, $stateParams, authService, userEntityService, user, userClaims, company) {
               if (authService.hasCompanyClaim(userClaims, 'View-Company-Users', company._id)) {
                 return userEntityService.getUserCompanyUsers(user._id, company._id);
               } else return null;
             }
           ]
         }
       })
       .state('system.app.user.company.dashboard', {
         url: '/dashboard',
         templateUrl: '/app/components/app/components/user/views/userCompanyDashboard.html',
         controller: 'userCompanyDashboardController'
       })
       .state('system.app.user.company.settings', {
         url: '/settings',
         templateUrl: '/app/components/app/components/user/views/userCompanySettings.html',
         controller: 'userCompanySettingsController'
       })
       .state('system.app.user.company.appointboardmember', {
         url: '/board/appoint',
         templateUrl: '/app/components/app/components/user/views/userCompanyAppointBoardMember.html',
         controller: 'userCompanyAppointBoardMemberController'
       })
       .state('system.app.user.company.inviteuser', {
         url: '/users/add',
         templateUrl: '/app/components/app/components/user/views/userCompanyInviteUser.html',
         controller: 'userCompanyInviteUserController'
       })
       .state('system.app.user.company.addshares', {
         url: '/shares/add',
         templateUrl: '/app/components/app/components/user/views/userCompanyAddShares.html',
         controller: 'userCompanyAddSharesController'
       })
       .state('system.app.user.company.addround', {
         url: '/rounds/add',
         templateUrl: '/app/components/app/components/user/views/userCompanyAddRound.html',
         controller: 'userCompanyAddRoundController'
       });

   }
 ]);
