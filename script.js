var app = angular.module('myApp', []);
app.controller('UserController', function($scope, $http, $filter) {
  $scope.team = [];
  $scope.domains = ['Finance', 'Marketing', 'IT', 'HR']; // Add all possible domains here
  $scope.genders = ['Male', 'Female']; // Add all possible genders here
  $scope.availabilities = ['Available', 'Not Available']; // Add all possible availabilities here

  $http.get('https://drive.google.com/file/d/1ibmr3WD7Jw6oLL6O_W390WojCLfCHw-k/view?usp=sharing')
    .then(function(response) {
      $scope.users = response.data;
    });

  $scope.$watchGroup(['searchName', 'selectedDomain', 'selectedGender', 'selectedAvailability'], function(newValues, oldValues) {
    $scope.filteredUsers = $filter('filter')($scope.users, function(user) {
      return user.name.includes(newValues[0]) && 
             user.domain === newValues[1] && 
             user.gender === newValues[2] && 
             user.availability === newValues[3];
    });
  });

  $scope.addToTeam = function(user) {
    // Check if the user's domain is already in the team
    var domainExists = $scope.team.some(function(teamUser) {
      return teamUser.domain === user.domain;
    });

    if (!domainExists) {
      $scope.team.push(user);
    }
  };
});

app.filter('startFrom', function() {
  return function(input, start) {
    start = +start; //parse to int
    return input.slice(start);
  }
});