angular.module('throughCompanyApp').controller('projectCtrl', [
  '$scope',
  '$state',
  '$rootScope',
  '$modal',
  '$timeout',
  'projectService',
  'organizationService',
  'alertService',
  'project',
  'utilsService',
  'scrollbar',
  function($scope, $state, $rootScope, $modal, $timeout, projectService, organizationService, alertService, project, utilsService, scrollbar) {
    $scope.setMetaTitle(project.name);
    $scope.setMetaDescription(project.name);

    $scope.project = project;
    $scope.savingWiki = false;
    $scope.loaded = false;

    if ($state.params.section) {
      $scope.currentSection = $state.params.section;
    } else {
      $scope.currentSection = 'project-needs';
    }

    projectService.getProjectUsers({
      projectId: $scope.project._id
    }).then(function success(response) {
      $scope.projectUsers = response;
    });

    if ($scope.project.organizationProject) {
      organizationService.getOrganizationById({
        organizationId: $scope.project.organizationProject.organization
      }).then(function success(response) {
        $scope.organization = response;
      });
    }

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

    $scope.$on('scroll', function(event, args) {
      if (!args || !args.id) return;

      $scope.scrollTo(args.id);
    });

    $scope.scrollTo = function(id) {
      var currentHeight = scrollbar.getCurrentHeight();

      if (id === 'project-wiki' && (currentHeight > 200 && currentHeight < 600)) return;

      utilsService.scrollTo(id, 40);
    };

    $scope.navigateTo = function(state, stateParams, id) {
      var currentState = $state.current.name;

      $scope.currentSection = id;

      if (currentState !== state) {
        $state.go(state);

        $timeout(function() {
          $scope.$emit('scroll', {
            id: id
          });
        });
      } else {
        $scope.scrollTo(id);
      }
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

    $scope.viewProjectNeed = function(projectNeed) {
      $modal.open({
        templateUrl: '/app/components/project/viewNeed/projectViewNeed.html',
        controller: 'projectViewNeedCtrl',
        resolve: {
          project: function() {
            return $scope.project;
          },
          projectNeed: function() {
            return projectNeed;
          }
        }
      });
    };

    $scope.addNeed = function() {
      $modal.open({
        templateUrl: '/app/components/project/addNeed/projectAddNeed.html',
        controller: 'projectAddNeedCtrl',
        resolve: {
          project: function() {
            return $scope.project;
          }
        }
      });
    };

    $scope.updateProjectThrottled = _.throttle($scope.updateProject, 2700);
  }
]);
