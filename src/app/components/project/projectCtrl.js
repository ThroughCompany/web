angular.module('throughCompanyApp').controller('projectCtrl', [
  '$scope',
  '$rootScope',
  '$modal',
  '$timeout',
  'projectService',
  'alertService',
  'project',
  'utilsService',
  'scrollbar',
  function($scope, $rootScope, $modal, $timeout, projectService, alertService, project, utilsService, scrollbar) {
    $rootScope.setMetaTitle(project.name);

    $scope.project = project;
    $scope.savingWiki = false;
    $scope.loaded = false;

    projectService.getProjectUsers({
      projectId: $scope.project._id
    }).then(function success(response) {
      $scope.projectUsers = response;
    });

    $scope.getProjectUserName = function(projectUser) {
      if (projectUser.firstName && projectUser.lastName) return projectUser.firstName + ' ' + projectUser.lastName;
      return projectUser.email;
    };

    $scope.form = {
      projectId: $scope.project._id
    };

    $scope.changeWikiPage = function(page) {
      $scope.form.wiki = page.text;
      $scope.form.pageId = page._id;
    };

    $scope.createWikiPage = function() {
      if (!$scope.currentUser) return;

      projectService.createWikiPage({
        projectId: $scope.project._id
      }).then(function(response) {
        $scope.project.wiki.pages.push(response);
      }, function(response) {
        $scope.logger.error(response);
      });
    };

    $scope.changeWikiPage($scope.project.wiki.pages[0]);

    $scope.$watch('form.wiki', function(val) {
      if (!$scope.currentUser || !$scope.loaded) return;

      if (val !== undefined && val !== null && val !== '') {
        $scope.updateProjectThrottled();
      }
    });

    $scope.scrollTo = function(id) {
      var currentHeight = scrollbar.getCurrentHeight();

      if (id === 'project-wiki' && (currentHeight > 200 && currentHeight < 600)) return;

      utilsService.scrollTo(id, 40);
    };

    $timeout(function() {
      $scope.loaded = true;
    }, 300);

    $scope.updateProject = function(form) {
      $scope.savingWiki = true;

      projectService.updateWikiPageById({
        projectId: $scope.project._id,
        pageId: $scope.form.pageId,
        text: $scope.form.wiki
      }).then(function(response) {
        $timeout(function() {
          $scope.savingWiki = false;
        }, 500);
        $scope.project = _.extend($scope.project, response);
      }, function(response) {
        $timeout(function() {
          $scope.savingWiki = false;
        }, 500);

        $scope.logger.error(response);
      });
    };

    $scope.updateProjectThrottled = _.throttle($scope.updateProject, 2700);
  }
]);
