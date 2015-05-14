angular.module('throughCompanyApp').controller('projectAddNeedCtrl', [
  '$scope',
  '$state',
  '$rootScope',
  '$modalInstance',
  '$timeout',
  'projectService',
  'alertService',
  'project',
  'utilsService',
  'skillService',
  'needService',
  function($scope, $state, $rootScope, $modalInstance, $timeout, projectService, alertService, project, utilsService, skillService, needService) {
    $scope.project = project;

    $scope.skills = [];
    $scope.getSkills = _getSkills;
    $scope.newSkill = function(skill) {
      return {
        name: skill
      };
    };

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };

    // $scope.employmentTypes = [{
    //   name: 'Volunteer',
    //   type: 'VOLUNTEER'
    // }, {
    //   name: 'Full Time',
    //   type: 'FULL_TIME'
    // }, {
    //   name: 'Part Time',
    //   type: 'PART_TIME'
    // }];

    $scope.addProjectNeedForm = {
      skills: [],
      timeCommitment: {},
      description: null,
      duration: {
        startDate: '',
        endDate: ''
      },
      locationSpecific: false
    };

    $scope.addProjectNeed = function(form) {
      $scope.submitted = true;

      if (!$scope.addProjectNeedForm.skills || !$scope.addProjectNeedForm.skills.length) {
        $scope.skillsInvalid = true;
        return;
      }
      if (!form.$valid) return;

      needService.create({
        projectId: $scope.project._id,
        name: $scope.addProjectNeedForm.name,
        skills: _.pluck($scope.addProjectNeedForm.skills, 'name'),
        description: $scope.addProjectNeedForm.description,
        timeCommitment: $scope.addProjectNeedForm.timeCommitment,
        duration: $scope.addProjectNeedForm.duration,
        locationSpecific: $scope.addProjectNeedForm.locationSpecific
      }).then(function success(response) {
        $scope.project.needs.push(response);

        alertService.success('Project need added.');

        $modalInstance.close();
      }, function error(response) {
        alertService.error(utilsService.getServerErrorMessage(response));
      });
    };

    $scope.form = {
      projectId: $scope.project._id
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
