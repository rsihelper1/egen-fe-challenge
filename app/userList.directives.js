var moduleName = 'userList.directives';

const Q = new WeakMap();
const HTTP = new WeakMap();

class UniqueUserEmail {
    constructor($q, $http) {
        this.require = 'ngModel';
        this.restrict = 'A';

        Q.set(this, $q);
        HTTP.set(this, $http);
    }

    link(scope, elem, attrs, ngModelController) {
        ngModelController.$asyncValidators.uniqueUserEmail = function(userEmail) {
            return Q.get(UniqueUserEmail.instance)((resolve, reject) => {
                
                HTTP.get(UniqueUserEmail.instance).get('http://mocker.egen.io/users').then(result => {
                    for (let i = 0; i < result.data.length; i++) {
                        if (result.data[i].email == userEmail) {
                            reject();
                            return;
                        }
                    }
                    resolve();
                    return;
                });

            });
        }
    }

    static directiveFactory($q, $http) {
        UniqueUserEmail.instance = new UniqueUserEmail($q, $http);
        return UniqueUserEmail.instance;
    }
}

UniqueUserEmail.directiveFactory.$inject = ['$q', '$http'];

angular.module(moduleName, [])
    .directive('uniqueUserEmail', UniqueUserEmail.directiveFactory);

export default moduleName;
