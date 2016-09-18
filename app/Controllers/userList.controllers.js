import HomeController from './HomeController';
import AddUserController from './AddUserController';
import ShowUserController from './ShowUserController';

var moduleName='userList.controllers';

angular.module(moduleName, [])
    .controller('userList.homeController', HomeController)
    .controller('userList.addUserController', AddUserController)
    .controller('userList.showUserController', ShowUserController);

export default moduleName;