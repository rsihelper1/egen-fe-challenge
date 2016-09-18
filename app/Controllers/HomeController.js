const INIT = new WeakMap();
const SERVICE = new WeakMap();
const TIMEOUT = new WeakMap();
const LOCATION = new WeakMap();

class HomeController{
  constructor($timeout, userListSvc, $location){
    SERVICE.set(this, userListSvc);
    TIMEOUT.set(this, $timeout);
    LOCATION.set(this, $location);

    INIT.set(this, () => {
      SERVICE.get(this).getActiveUsers().then(users => {
        this.users = users;
      });
    });

    INIT.get(this)();
  }

  markUserAsRead(userId, isUserRead){
    return SERVICE.get(this).markUserRead(userId, isUserRead)
      .then(() => {
        INIT.get(this)();
        this.readSuccess = true;
        this.readSuccessMessage = isUserRead ? "User marked as read." : "User marked as unread.";
        TIMEOUT.get(this)(() => {
          this.readSuccess = false;
        }, 2500);
      });
  }
 
  showUser(userId)
  {
    LOCATION.get(this).path(`/showUser/${userId}`);
  }


  addToArchive(userId){
    return SERVICE.get(this).addToArchive(userId)
      .then(() => {
        INIT.get(this)();
        this.archiveSuccess = true;
        TIMEOUT.get(this)(() => {
          this.archiveSuccess = false;
        }, 2500);
      });
  }
}

HomeController.$inject = ['$timeout', 'userListSvc','$location'];

export default HomeController;