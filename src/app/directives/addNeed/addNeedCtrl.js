angular.module('throughCompanyApp').controller('addNeedCtrl', [
  '$scope',
  '$state',
  '$rootScope',
  '$timeout',
  'projectService',
  'alertService',
  'utilsService',
  'skillService',
  'needService',
  function($scope, $state, $rootScope, $timeout, projectService, alertService, utilsService, skillService, needService) {
    $scope.skills = [];
    $scope.getSkills = _getSkills;
    $scope.newSkill = function(skill) {
      return {
        name: skill
      };
    };

    $scope.addNeedForm = {
      skills: [],
      timeCommitment: {},
      description: null,
      duration: {
        startDate: '',
        endDate: ''
      },
      locationSpecific: false
    };

    $scope.addNeed = function(form) {
      $scope.submitted = true;

      if (!$scope.addNeedForm.skills || !$scope.addNeedForm.skills.length) {
        $scope.skillsInvalid = true;
        return;
      }
      if (!form.$valid) return;

      needService.create({
        projectId: $scope.project ? $scope.project._id : null,
        userId: $scope.user ? $scope.user._id : null,
        name: $scope.addNeedForm.name,
        skills: _.pluck($scope.addNeedForm.skills, 'name'),
        description: $scope.addNeedForm.description,
        timeCommitment: $scope.addNeedForm.timeCommitment,
        duration: $scope.addNeedForm.duration,
        locationSpecific: $scope.addNeedForm.locationSpecific
      }).then(function success(response) {
        if ($scope.project) $scope.project.needs.push(response);
        if ($scope.user) $scope.user.needs.push(response);

        alertService.success('Need added.');

        if ($scope.close) $scope.close();
      }, function error(response) {
        alertService.error(utilsService.getServerErrorMessage(response));
      });
    };

    $scope.form = {
      projectId: $scope.project ? $scope.project._id : null,
      userId: $scope.user ? $scope.user._id : null,
    };

    $scope.datePickerOptions = {
      minDate: moment()
    };

    function _getSkills(skill) {
      if (!skill || !skill.length) return;

      skillService.getAll({
        name: skill
      }).then(function success(response) {
        $scope.skills = response;
      });
    }
  }
]);
