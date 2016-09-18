const SERVICE = new WeakMap();
const TIMEOUT = new WeakMap();
const WINDOW = new WeakMap();
class AddUserController{
    constructor($timeout, userListSvc, $window){
        TIMEOUT.set(this, $timeout);
        SERVICE.set(this, userListSvc);
        WINDOW.set(this, $window);

        this.user = {};
    }
    
    randomPic()
    {
        
        if(!this.cats){
        this.cats = ["abstract","animals","business","cats","city","food",
        "nightlife","fashion","people","nature","sports","technics","transport"];
        }
        var ri = Math.floor((Math.random() * this.cats.length) + 1);
        return  this.cats[ri - 1];
    }

    addUser(){
        if(this.addUserForm.$valid && this.user !== {}){
            this.user.profilePic = "http://lorempixel.com/640/480/" + this.randomPic() + "/";
            SERVICE.get(this).addUser(this.user).then(message => {
                
                WINDOW.get(this).scrollTo(0,0);
                this.addSuccess = true;
                TIMEOUT.get(this)(() => {
                    this.addSuccess = false;
                }, 2500);

                this.resetUser();
            }, error => {
                WINDOW.get(this).scrollTo(0,0);
                this.addFailed = true;
                TIMEOUT.get(this)(() => {
                    this.addFailed = false;
               }, 2500);
            });
        }
    }

    resetUser(){
        this.addUserForm.$setPristine();
        this.addUserForm.$setUntouched();
        this.user = {};
    }
}

AddUserController.$inject = ['$timeout', 'userListSvc', '$window'];

export default AddUserController;