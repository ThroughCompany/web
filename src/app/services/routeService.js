angular.module('throughCompanyApp').constant('routes', {
  //system routes
  home: 'system.home',
  project: 'system.project', //public project page
  signIn: 'system.signIn',
  signUp: 'system.signUp',
  //user routes
  userProfile: 'system.app.userProfile',
  userSettings: 'system.app.userSettings',
  userSettingsProfile: 'system.app.userSettings.profile',
  createProject: 'system.app.createProject',
  projectSettings: 'system.app.projectSettings'
});
