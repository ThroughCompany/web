angular.module('throughCompanyApp').controller('projectCtrl', [
  '$scope',
  '$state',
  '$rootScope',
  '$modal',
  '$timeout',
  'projectService',
  'alertService',
  'project',
  'utilsService',
  'scrollbar',
  'assetTagService',
  function($scope, $state, $rootScope, $modal, $timeout, projectService, alertService, project, utilsService, scrollbar, assetTagService) {
    $scope.setMetaTitle(project.name);
    $scope.setMetaDescription(project.name);

    $scope.project = project;
    $scope.savingWiki = false;
    $scope.loaded = false;

    projectService.getProjectUsers({
      projectId: $scope.project._id
    }).then(function success(response) {
      $scope.projectUsers = response;
    });

    $scope.createAssetTag = _createAssetTag;
    $scope.getAssetTags = _getAssetTags;
    $scope.newAssetTag = function(tag) {
      return {
        name: tag
      };
    };

    $scope.addAssetTagForm = {
      tags: [],
      tag: null,
      description: null
    };
    $scope.assetTags = [];

    $scope.$watch('addAssetTagForm.tags', function(val) {
      if (!val || !val.length) return;

      $scope.addAssetTagForm.tag = val[0];
      $scope.addAssetTagForm.tags = null;

      // var currentTags = $scope.project.assetTags && $scope.project.assetTags.length ? _.pluck($scope.project.assetTags, 'name') : [];
      // var newTags = _.filter(val, function(tag) {
      //   return !_.contains(currentTags, tag);
      // });

      // if (newTags && newTags.length) {
      //   _.each(newTags, function(newTag) {
      //     $scope.createAssetTag(newTag.name);
      //   });
      //   $scope.addAssetTagForm.tags = [];
      //   $scope.assetTags.selected = undefined;
      // }
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

    $scope.$on('scroll', function(event, args) {
      if (!args || !args.id) return;

      $scope.scrollTo(args.id);
    });

    $scope.scrollTo = function(id) {
      var currentHeight = scrollbar.getCurrentHeight();

      if (id === 'project-wiki' && (currentHeight > 200 && currentHeight < 600)) return;

      utilsService.scrollTo(id, 40);
    };

    $scope.navigateTo = function(state, id) {
      var currentState = $state.current.name;

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

    $scope.updateProjectThrottled = _.throttle($scope.updateProject, 2700);

    function _createAssetTag(tagName) {
      projectService.createAssetTag({
        projectId: $scope.project._id,
        name: tagName
      }).then(function success(response) {
        $scope.project.assetTags.push(response);

        alertService.success('Asset added.');
      }, function error(response) {
        alertService.error(utilsService.getServerErrorMessage(response));
      });
    }

    function _getAssetTags(tagName) {
      if (!tagName || !tagName.length) return;

      assetTagService.getAll({
        name: tagName
      }).then(function success(response) {
        var indexedTags = _.indexBy($scope.project.assetTags, 'name');

        $scope.assetTags = _.filter(response, function(tag) {

          var exists = indexedTags[tag.name];
          return exists ? false : true;
        });

        console.log($scope.assetTags);
      });
    }
  }
]);
