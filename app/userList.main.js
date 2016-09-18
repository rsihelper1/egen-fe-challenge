import { default as controllersModuleName } from './Controllers/userList.controllers';
import { default as servicesModuleName } from './userList.services';
import { default as directivesModuleName } from './userList.directives';

var moduleName = 'userList';

function uiRouteConfig($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('start', {
      url: '/',
      templateUrl: 'templates/listUsers.html',
      controller:'userList.homeController',
      controllerAs:'vm'
    })
    .state('addUser',{
      url:'/addUser',
      templateUrl:'templates/addUser.html',
      controller:'userList.addUserController',
      controllerAs:'vm'
    })
    .state('deleteUser', {
      url: '/showUser/:userId',
      templateUrl:'templates/showUser.html',
      controller:'userList.showUserController',
      controllerAs:'vm'
    });
    $urlRouterProvider.otherwise("/");

}

var app = angular.module(moduleName, ['ui.router','ngMessages', servicesModuleName, controllersModuleName, directivesModuleName]);

app.config(uiRouteConfig);

export default moduleName;