webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	/// <reference path="../typings/index.d.ts" />
	var $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"angular-route\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"angular-off-click\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"angular-animate\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"angular-aria\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"angular-material\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var users_service_1 = __webpack_require__(8);
	var authentication_service_1 = __webpack_require__(9);
	//import { TravelsService }		from './services/travels.service';
	var countries_service_1 = __webpack_require__(10);
	//import { AccountsService }		from './services/accounts.service';
	// import { OperationsService }		from './services/operations.service';
	// import { ItineraryService }		from './services/itinerary.service';
	var tbk_main_component_1 = __webpack_require__(11);
	var tbk_accueil_component_1 = __webpack_require__(13);
	var tbk_authentication_component_1 = __webpack_require__(15);
	// import { TbkTravels } 			from './components/tbk-travels/tbk-travels.component';
	// import { TbkTravelsList } 		from './components/tbk-travels/tbk-travels-list.component';
	// import { TbkBudget } 			from './components/tbk-budget/tbk-budget.component';
	// import { TbkAccountsList }		from './components/tbk-budget/tbk-accounts-list.component';
	// import { TbkOperationsList }	from './components/tbk-budget/tbk-operations-list.component';
	// import { TbkBudgetStatistics }	from './components/tbk-budget/tbk-budget-statistics.component';
	// import { TbkItineraire } 		from './components/tbk-itineraire/tbk-itineraire.component';
	// import { TbkCalendar } 			from './components/tbk-itineraire/tbk-calendar.component';
	// import './js/jquery-jvectormap-2.0.4.min.js';
	// import './js/jquery-jvectormap-world-mill-en.js';
	// import './js/angular-locale_fr-fr.js';
	// import './js/Chart.js';
	// import './js/angular-chart.js';
	// import {TbkMap}		from './components/tbk-map/tbk-map.directive';
	//angular.module('tbk', ['ngMaterial', 'ngRoute', 'offClick', 'chart.js'])
	angular.module('tbk', ['ngRoute'])
	    .service('usersService', users_service_1.UsersService)
	    .service('authenticationService', authentication_service_1.AuthenticationService)
	    .service('countriesService', countries_service_1.CountriesService)
	    .component('tbkMain', tbk_main_component_1.TbkMain)
	    .component('tbkAccueil', tbk_accueil_component_1.TbkAccueil)
	    .component('tbkAuthentication', tbk_authentication_component_1.TbkAuthentication)
	    .config(['$routeProvider', function ($routeProvider) {
	        $routeProvider
	            .when('/accueil', {
	            template: '<tbk-accueil></tbk-accueil>',
	        })
	            .when('/login', {
	            template: '<tbk-authentication></tbk-authentication>',
	        });
	        // .when('/budget', {
	        // template: '<tbk-budget></tbk-budget>',
	        // })
	        // .when('/itineraire', {
	        // template: '<tbk-itineraire></tbk-itineraire>',
	        // });
	    }]);
	// .config(function($mdDateLocaleProvider) {
	// $mdDateLocaleProvider.formatDate = function(date) {
	// if(date) {
	// return date.getDate().toString() + '/' + (date.getMonth() + 1).toString() + '/' + date.getFullYear().toString();
	// } else {
	// return null;}
	// };
	//}); 


/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var UsersService = (function () {
	    function UsersService($http) {
	        this.$http = $http;
	    }
	    UsersService.prototype.getUsers = function () {
	        return this.$http.get('http://localhost:5000/api/users')
	            .then(function (response) { return response.data; })
	            .catch(function (error) { return console.log("Erreur getUser" + error.data); });
	    };
	    return UsersService;
	}());
	exports.UsersService = UsersService;


/***/ }),
/* 9 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var AuthenticationService = (function () {
	    function AuthenticationService($http, $window) {
	        this.$http = $http;
	        this.$window = $window;
	    }
	    ;
	    AuthenticationService.prototype.saveToken = function (token) {
	        this.$window.localStorage['tbk-token'] = token;
	    };
	    ;
	    AuthenticationService.prototype.getToken = function () {
	        return this.$window.localStorage['tbk-token'];
	    };
	    ;
	    AuthenticationService.prototype.logout = function () {
	        this.$window.localStorage.removeItem('tbk-token');
	    };
	    ;
	    AuthenticationService.prototype.isLoggedIn = function () {
	        var token = this.getToken();
	        var payload;
	        if (token) {
	            payload = token.split('.')[1];
	            payload = this.$window.atob(payload);
	            payload = JSON.parse(payload);
	            return payload.exp > Date.now() / 1000;
	        }
	        else {
	            return false;
	        }
	    };
	    ;
	    AuthenticationService.prototype.login = function (user) {
	        var _this = this;
	        return this.$http({
	            method: 'POST',
	            url: '/api/login',
	            data: user
	        })
	            .then(function (response) { _this.saveToken(response.data); });
	    };
	    ;
	    return AuthenticationService;
	}());
	exports.AuthenticationService = AuthenticationService;


/***/ }),
/* 10 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var CountriesService = (function () {
	    function CountriesService($http) {
	        this.$http = $http;
	    }
	    CountriesService.prototype.getCountries = function () {
	        return this.$http.get("http://localhost:3000/api/countries")
	            .then(function (response) { return response.data; })
	            .catch(function (error) { return console.log("Erreur getCountries" + error.data); });
	    };
	    return CountriesService;
	}());
	exports.CountriesService = CountriesService;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/// <reference path="../../../typings/index.d.ts" />
	Object.defineProperty(exports, "__esModule", { value: true });
	var TbkMainCtrl = (function () {
	    /** @ngInject */
	    function TbkMainCtrl(usersService, countriesService, $location) {
	        this.selUser = function (id) {
	            var _this = this;
	            this.connectedUser = this.users[id];
	            this.friends = [];
	            this.users.forEach(function (user) {
	                if (user != _this.connectedUser) {
	                    _this.friends.push(user);
	                }
	            });
	            this.showUserMenu = false;
	            this.goAccueil();
	        };
	        this.setTravel = function (travel) {
	            this.selectedTravel = travel;
	        };
	        this.goAccueil = function () { this.$location.path('/accueil'); };
	        this.goTravels = function () { this.$location.path('/travels'); };
	        this.goBudget = function () { this.$location.path('/budget'); };
	        this.goItineraire = function () { this.$location.path('/itineraire'); };
	        this.usersService = usersService;
	        this.countriesService = countriesService;
	        this.$location = $location;
	        this.activate();
	    }
	    TbkMainCtrl.prototype.activate = function () {
	        //this.getUsers().then(() => { console.log(`users  : ${angular.toJson(this.users)}`); });
	        //this.getCountries().then(() => { console.log(`countries  : ${this.countries.length}`); });
	    };
	    TbkMainCtrl.prototype.getUsers = function () {
	        var that = this;
	        return this.usersService.getUsers()
	            .then(function (data) {
	            that.users = data;
	            return that.users;
	        });
	    };
	    TbkMainCtrl.prototype.getCountries = function () {
	        var that = this;
	        return this.countriesService.getCountries()
	            .then(function (data) {
	            that.countries = [];
	            that.continents = [];
	            data.forEach(function (d) {
	                if (d.type == 'p') {
	                    that.countries.push(d);
	                }
	                if (d.type == 'c') {
	                    that.continents.push(d);
	                }
	            });
	            return that.countries;
	        });
	    };
	    return TbkMainCtrl;
	}());
	exports.TbkMain = {
	    template: __webpack_require__(12),
	    controller: TbkMainCtrl,
	    controllerAs: 'mainCtrl',
	    transclude: true
	};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

	module.exports = "<nav class=\"tbk-header\">\r\n\t<!-- Bouton titre, lien vers l'acceuil -->\r\n\t<a ng-click=\"mainCtrl.goAccueil()\" class=\"tbk-header-title\" >\r\n\t\t<i class=\"material-icons\">flight_takeoff</i>TBK<i class=\"material-icons\">flight_land</i>\r\n\t</a>\r\n\t<div ng-show=\"mainCtrl.connectedUser\">\r\n\t\t<!-- Bouton Voyages -->\r\n\t\t<a ng-click=\"mainCtrl.goTravels()\" class=\"tbk-header-nav-link\" >\r\n\t\t\t<i class=\"material-icons\">map</i>\r\n\t\t\t<span class=\"tbk-header-nav-link-text\">Voyages</span>\r\n\t\t</a> \r\n\t\t\r\n\t\t<a class=\"tbk-nav-travel-name\" ng-show=\"mainCtrl.selectedTravel\">\r\n\t\t\t<span class=\"tbk-header-nav-link-text\">\r\n\t\t\t\t{{mainCtrl.selectedTravel.countriesNames}}<br/>({{mainCtrl.selectedTravel.departDate | date:\"yyyy\" }})\r\n\t\t\t</span>\r\n\t\t</a>\r\n\t\r\n\t\t<a class=\"tbk-header-nav-link\" ng-click=\"mainCtrl.goBudget()\" ng-show=\"mainCtrl.selectedTravel\">\r\n\t\t\t<i class=\"material-icons\">account_balance_wallet</i>\r\n\t\t\t<span class=\"tbk-header-nav-link-text\">Budget</span>\r\n\t\t</a>\r\n\t\t<a class=\"tbk-header-nav-link\" ng-click=\"mainCtrl.goItineraire()\" ng-show=\"mainCtrl.selectedTravel\">\r\n\t\t\t<i class=\"material-icons\">directions</i>\r\n\t\t\t<span class=\"tbk-header-nav-link-text\">Itinéraire</span>\r\n\t\t</a>\r\n\t</div>\r\n\t<div class=\"tbk-header-user dropdow_container\" id=\"connectinLink\" ng-click=\"mainCtrl.showUserMenu = !mainCtrl.showUserMenu\">\r\n\t\t<span ng-show=\"!mainCtrl.connectedUser\" class=\"tbk-header-nav-link-text\">_login_</span>\r\n\t\t<span ng-show=\"mainCtrl.connectedUser\" class=\"tbk-header-nav-link-text\">{{mainCtrl.connectedUser.firstname}}</span>\t\r\n\t</div>\r\n</nav>\r\n\r\n<div class=\"dropdow user-menu\" ng-show=\"mainCtrl.showUserMenu\" off-click=\"mainCtrl.showUserMenu = false\" off-click-if=\"mainCtrl.showUserMenu\">\r\n\t<ul>\r\n\t\t<li ng-repeat=\"user in mainCtrl.users\" ng-click=\"mainCtrl.selUser($index)\">{{user.firstname}}</li>\r\n\t</ul>\r\n</div>\r\n\r\n<div class=\"main\">\r\n    <div class=\"page-content content\">\r\n        <ng-transclude></ng-transclude>\r\n    </div>\r\n</div>\r\n";

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/// <reference path="../../../typings/index.d.ts" />
	Object.defineProperty(exports, "__esModule", { value: true });
	var TbkAccueilCtrl = (function () {
	    function TbkAccueilCtrl() {
	    }
	    return TbkAccueilCtrl;
	}());
	exports.TbkAccueil = {
	    template: __webpack_require__(14),
	    controller: TbkAccueilCtrl,
	    controllerAs: 'accueilCtrl',
	    require: { parent: '^tbkMain' }
	};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

	module.exports = "<p>ACCUEIL</p>\r\n<span>Bonjour {{accueilCtrl.parent.connectedUser.firstname}}</span>\r\n<br/>\r\n";

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/// <reference path="../../../typings/index.d.ts" />
	Object.defineProperty(exports, "__esModule", { value: true });
	var TbkAuthenticationCtrl = (function () {
	    /** @ngInject */
	    function TbkAuthenticationCtrl(authenticationService) {
	        this.credentials = { email: "test", password: "" };
	        this.login = function () {
	            console.log(this.credentials);
	            this.authentService.login(this.credentials)
	                .then(function () {
	                this.parent.goAccueil();
	            })
	                .catch(function (err) {
	                console.log(err);
	                alert(err.data);
	            });
	        };
	        this.authentService = authenticationService;
	    }
	    ;
	    return TbkAuthenticationCtrl;
	}());
	exports.TbkAuthentication = {
	    template: __webpack_require__(16),
	    controller: TbkAuthenticationCtrl,
	    controllerAs: 'authentCtrl',
	    require: { parent: '^tbkMain' }
	};


/***/ }),
/* 16 */
/***/ (function(module, exports) {

	module.exports = "\r\n<div class=\"modal-window\">\r\n\t\t\t\r\n\t<div class=\"sheet-head\">\r\n\t\t<div class=\"sheet-title\">Se connecter</div>\r\n\t</div>\r\n\t\r\n\t<form novalidate name=\"loginForm\">\r\n\t\t<div layout='row' layout-fill layout-margin layout-align='start'>\r\n\t\t\t<md-input-container>\r\n\t\t\t\t<label>Username :</label>\r\n\t\t\t\t<input ng-model=\"authentCtrl.credentials.email\" ng-require >\r\n\t\t\t</md-input-container>\r\n\t\t\t<md-input-container>\r\n\t\t\t\t<label>Mot de passe :</label>\r\n\t\t\t\t<input ng-model=\"authentCtrl.credentials.password\" ng-require >\r\n\t\t\t</md-input-container>\r\n\t\t</div>\t\r\n\t\t<div class=\"actions\">\r\n\t\t\t<input type=\"button\" value=\"Connexion\" class=\"bouton\" ng-click=\"authentCtrl.login()\" ng-disabled=\"!loginForm.$valid\"/>\r\n\t\t</div>\r\n\t</form>\r\n</div>\r\n\r\n";

/***/ })
]);