angular.module('throughCompanyApp').constant('routes', {
  //system routes
  home: 'system.home',
  project: 'system.project', //public project page
  user: 'system.user', //public user page
  startProject: 'system.startProject', //public project page
  signIn: 'system.signIn',
  signUp: 'system.signUp',
  //user routes
  userProfile: 'system.app.userProfile',
  userSettingsProfile: 'system.app.userSettings.profile',
  createProject: 'system.app.createProject',
  projectSettingsProfile: 'system.app.projectSettings.profile',
  projectSettingsWiki: 'system.app.projectSettings.wiki'
});
