console.log("🚀 Starting app...");

var App = function() {
    console.log("App constructor");
    this.showLogin();
};

App.prototype.showLogin = function() {
    console.log("Showing login...");
    var container = document.getElementById('pageContainer');
    if (container && window.LoginPage) {
        container.innerHTML = window.LoginPage.render();
        document.getElementById('navTabs').style.display = 'none';
        document.getElementById('userBadge').style.display = 'none';
        setTimeout(function() {
            if (window.LoginPage.setupEvents) {
                window.LoginPage.setupEvents();
            }
        }, 100);
    }
};

window.app = new App();
