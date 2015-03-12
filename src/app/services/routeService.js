angular.module('throughCompanyApp').constant('routes', {
  //system routes
  home: 'system.home',
  signIn: 'system.signIn',
  signUp: 'system.signUp',
  //user routes
  userProfile: 'system.app.userProfile',
  userSettings: 'system.app.userSettings',
  userSettingsProfile: 'system.app.userSettings.profile',
  createProject: 'system.app.createProject',
  //project routes
  projectProfile: 'system.app.projectProfile',
});
