angular.module('throughCompanyApp').constant('routes', {
  //system routes
  home: 'system.home',
  project: 'system.project', //public project page
  user: 'system.user', //public user page
  startProject: 'system.startProject', //public project page
  signIn: 'system.signIn',
  signUp: 'system.signUp',
  //user routes
  userProfile: 'system.userProfile',
  userSettingsProfile: 'system.userSettings.profile',
  createProject: 'system.createProject',
  projectSettingsProfile: 'system.projectSettings.profile'
});
