const INIT = new WeakMap();
const SERVICE = new WeakMap();
const LOCATION = new WeakMap();
const TIMEOUT = new WeakMap();

class ShowUserController {
    constructor($stateParams, userListSvc, $location, $timeout) {
        SERVICE.set(this, userListSvc);
        LOCATION.set(this, $location);
        TIMEOUT.set(this, $timeout);
        var userId = $stateParams.userId;
        INIT.set(this, () => {

            SERVICE.get(this).getUserDetails(userId).then(user => {
                this.user = user;
            });
        });

        INIT.get(this)();

        this.backUrl = "#/";
    }

    deleteUser(userId) {
        SERVICE.get(this).deleteUser(userId).then(ret => {

            this.deleteSuccess = true;
                TIMEOUT.get(this)(() => {
                    this.deleteSuccess = false;
                     LOCATION.get(this).path("#/");
                }, 2500);

           
        });

    }
}

ShowUserController.$inject = ['$stateParams', 'userListSvc', '$location', '$timeout'];

export default ShowUserController;
