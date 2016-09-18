var moduleName = 'userList.services';

const HTTP = new WeakMap();

class UserListService {
    constructor($http) {
        HTTP.set(this, $http);
    }

    getActiveUsers() {
        return HTTP.get(this).get('http://mocker.egen.io/users').then(result => result.data);
    }
    addUser(user) {
        return HTTP.get(this).post('http://mocker.egen.io/users', user).then(result => result.data);
    }

    getUserDetails(userId) {
        return HTTP.get(this).get(`http://mocker.egen.io/users/${userId}`).then(result => result.data);

    }
    deleteUser(userId) {
        return HTTP.get(this).delete(`http://mocker.egen.io/users/${userId}`).then(result => result.data);
    }
    
    checkIfEmailExists(userEmail) {

       console.log("CheckEmail: " + userEmail);
        HTTP.get(this).get('http://mocker.egen.io/users/bulk').then(result => {
          //console.log("CheckEmail result data: " + result.data.length);
            for (let i = 0; i < result.data.length; i++) {
              // console.log(`CheckEmail result data ${i} = ${result.data[i].email}`);
                if (result.data[i].email == userEmail) return true;
            }
            return false;
        });
    }

    static userListFactory($http) {
        return new UserListService($http);
    }
}

UserListService.userListFactory.$inject = ['$http'];

angular.module(moduleName, [])
    .factory('userListSvc', UserListService.userListFactory);

export default moduleName;
