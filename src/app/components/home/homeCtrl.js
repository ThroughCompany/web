angular.module('throughCompanyApp').controller('homeCtrl', [
  '$scope',
  'projectService',
  function($scope, projectService) {
    projectService.getProjects({

    }).then(function success(response) {
      $scope.projects = response;

      // $scope.projects = [{
      //   name: 'City Awake',
      //   slug: 'city-awake',
      //   created: moment().toDate(),
      //   shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel tincidunt tellus. Nulla ut nunc ipsum. Duis eget magna a diam consectetur varius. Integer venenatis mauris vitae orci aliquam maximus vel sed nibh. Fusce maximus odio id urna efficitur, nec tristique ipsum finibus. Nullam feugiat rutrum accumsan. Etiam faucibus quis dui sit amet sagittis. Suspendisse venenatis vel nulla id euismod. Aenean dignissim eros non consequat porttitor.'
      // }, {
      //   name: 'Internet Cafe 4 Woman',
      //   slug: 'internet-cafe-4-woman',
      //   created: moment().toDate(),
      //   shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel tincidunt tellus. Nulla ut nunc ipsum. Duis eget magna a diam consectetur varius. Integer venenatis mauris vitae orci aliquam maximus vel sed nibh. Fusce maximus odio id urna efficitur, nec tristique ipsum finibus. Nullam feugiat rutrum accumsan. Etiam faucibus quis dui sit amet sagittis. Suspendisse venenatis vel nulla id euismod. Aenean dignissim eros non consequat porttitor.'
      // }, {
      //   name: 'Internet Cafe 4 Woman',
      //   slug: 'internet-cafe-4-woman',
      //   created: moment().toDate(),
      //   shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel tincidunt tellus. Nulla ut nunc ipsum. Duis eget magna a diam consectetur varius. Integer venenatis mauris vitae orci aliquam maximus vel sed nibh. Fusce maximus odio id urna efficitur, nec tristique ipsum finibus. Nullam feugiat rutrum accumsan. Etiam faucibus quis dui sit amet sagittis. Suspendisse venenatis vel nulla id euismod. Aenean dignissim eros non consequat porttitor.'
      // }, {
      //   name: 'Internet Cafe 4 Woman',
      //   slug: 'internet-cafe-4-woman',
      //   created: moment().toDate(),
      //   shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel tincidunt tellus. Nulla ut nunc ipsum. Duis eget magna a diam consectetur varius. Integer venenatis mauris vitae orci aliquam maximus vel sed nibh. Fusce maximus odio id urna efficitur, nec tristique ipsum finibus. Nullam feugiat rutrum accumsan. Etiam faucibus quis dui sit amet sagittis. Suspendisse venenatis vel nulla id euismod. Aenean dignissim eros non consequat porttitor.'
      // }, {
      //   name: 'Internet Cafe 4 Woman',
      //   slug: 'internet-cafe-4-woman',
      //   created: moment().toDate(),
      //   shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel tincidunt tellus. Nulla ut nunc ipsum. Duis eget magna a diam consectetur varius. Integer venenatis mauris vitae orci aliquam maximus vel sed nibh. Fusce maximus odio id urna efficitur, nec tristique ipsum finibus. Nullam feugiat rutrum accumsan. Etiam faucibus quis dui sit amet sagittis. Suspendisse venenatis vel nulla id euismod. Aenean dignissim eros non consequat porttitor.'
      // }, {
      //   name: 'Internet Cafe 4 Woman',
      //   slug: 'internet-cafe-4-woman',
      //   created: moment().toDate(),
      //   shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel tincidunt tellus. Nulla ut nunc ipsum. Duis eget magna a diam consectetur varius. Integer venenatis mauris vitae orci aliquam maximus vel sed nibh. Fusce maximus odio id urna efficitur, nec tristique ipsum finibus. Nullam feugiat rutrum accumsan. Etiam faucibus quis dui sit amet sagittis. Suspendisse venenatis vel nulla id euismod. Aenean dignissim eros non consequat porttitor.'
      // }];
    });
  }
]);
