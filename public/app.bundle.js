webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	/// <reference path="../typings/index.d.ts" />
	var $ = __webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(4);
	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(9);
	__webpack_require__(11);
	var users_service_1 = __webpack_require__(13);
	var authentication_service_1 = __webpack_require__(14);
	//import { TravelsService }		from './services/travels.service';
	var countries_service_1 = __webpack_require__(15);
	//import { AccountsService }		from './services/accounts.service';
	// import { OperationsService }		from './services/operations.service';
	// import { ItineraryService }		from './services/itinerary.service';
	var tbk_main_component_1 = __webpack_require__(16);
	var tbk_accueil_component_1 = __webpack_require__(18);
	var tbk_authentication_component_1 = __webpack_require__(20);
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


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	var jQuery = __webpack_require__(1);
	var $ = __webpack_require__(1);
	(function() {

	'use strict';

	angular.module('offClick', []);
	angular.module('offClick').directive('offClick', ["$rootScope", "$parse", "OffClickFilterCache", function ($rootScope, $parse, OffClickFilterCache) {
	    var id = 0;
	    var listeners = {};
	    // add variable to detect touch users moving..
	    var touchMove = false;

	    var targetInFilter = function targetInFilter(target, elms) {
	        if (!target || !elms) return false;
	        var elmsLen = elms.length;
	        for (var i = 0; i < elmsLen; ++i) {
	            var currentElem = elms[i];
	            var containsTarget = false;
	            try {
	                containsTarget = currentElem.contains(target);
	            } catch (e) {
	                // If the node is not an Element (e.g., an SVGElement) node.contains() throws Exception in IE,
	                // see https://connect.microsoft.com/IE/feedback/details/780874/node-contains-is-incorrect
	                // In this case we use compareDocumentPosition() instead.
	                if (typeof currentElem.compareDocumentPosition !== 'undefined') {
	                    containsTarget = currentElem === target || Boolean(currentElem.compareDocumentPosition(target) & 16);
	                }
	            }

	            if (containsTarget) {
	                return true;
	            }
	        }
	        return false;
	    };

	    var offClickEventHandler = function offClickEventHandler(event) {
	        // If event is a touchmove adjust touchMove state
	        if (event.type === 'touchmove') {
	            touchMove = true;
	            // And end function
	            return false;
	        }
	        // This will always fire on the touchend after the touchmove runs...
	        if (touchMove) {
	            // Reset touchmove to false
	            touchMove = false;
	            // And end function
	            return false;
	        }
	        var target = event.target || event.srcElement;
	        angular.forEach(listeners, function (listener, i) {
	            var filters = OffClickFilterCache['*'] || [];
	            if (listener.elm.id && listener.elm.id !== '') {
	                if (OffClickFilterCache['#' + listener.elm.id]) filters = filters.concat(OffClickFilterCache['#' + listener.elm.id]);
	            }
	            // classList is an object in IE10 and 11 iirc, using angular.forEach to iterate both over an array or object values
	            angular.forEach(listener.elm.classList, function (className) {
	                if (OffClickFilterCache['.' + className]) filters = filters.concat(OffClickFilterCache['.' + className]);
	            });
	            if (!(listener.elm.contains(target) || targetInFilter(target, filters))) {
	                $rootScope.$evalAsync(function () {
	                    listener.cb(listener.scope, {
	                        $event: event
	                    });
	                });
	            }
	        });
	    };

	    // Add event listeners to handle various events. Destop will ignore touch events
	    document.addEventListener("touchmove", offClickEventHandler, true);
	    document.addEventListener("touchend", offClickEventHandler, true);
	    document.addEventListener('click', offClickEventHandler, true);

	    return {
	        restrict: 'A',
	        compile: function compile(elem, attrs) {
	            var fn = $parse(attrs.offClick);

	            return function (scope, element) {
	                var elmId = id++;
	                var removeWatcher = void 0;

	                var on = function on() {
	                    listeners[elmId] = {
	                        elm: element[0],
	                        cb: fn,
	                        scope: scope
	                    };
	                };

	                var off = function off() {
	                    listeners[elmId] = null;
	                    delete listeners[elmId];
	                };

	                if (attrs.offClickIf) {
	                    removeWatcher = $rootScope.$watch(function () {
	                        return $parse(attrs.offClickIf)(scope);
	                    }, function (newVal) {
	                        newVal && on() || !newVal && off();
	                    });
	                } else on();

	                scope.$on('$destroy', function () {
	                    off();
	                    if (removeWatcher) {
	                        removeWatcher();
	                    }
	                    element = null;
	                });
	            };
	        }
	    };
	}]);

	angular.module('offClick').directive('offClickFilter', ["OffClickFilterCache", "$parse", function (OffClickFilterCache, $parse) {
	    var filters = void 0;

	    return {
	        restrict: 'A',
	        compile: function compile(elem, attrs) {
	            return function (scope, element) {
	                filters = $parse(attrs.offClickFilter)(scope).split(',').map(function (x) {
	                    return x.trim();
	                });

	                filters.forEach(function (filter) {
	                    OffClickFilterCache[filter] ? OffClickFilterCache[filter].push(element[0]) : OffClickFilterCache[filter] = [element[0]];
	                });

	                scope.$on('$destroy', function () {
	                    filters.forEach(function (filter) {
	                        if (angular.isArray(OffClickFilterCache[filter]) && OffClickFilterCache[filter].length > 1) {
	                            OffClickFilterCache[filter].splice(OffClickFilterCache[filter].indexOf(element[0]), 1);
	                        } else {
	                            OffClickFilterCache[filter] = null;
	                            delete OffClickFilterCache[filter];
	                        }
	                    });
	                    element = null;
	                });
	            };
	        }
	    };
	}]);

	angular.module('offClick').factory('OffClickFilterCache', function () {
	    var filterCache = {};
	    return filterCache;
	});
	}.call(window));

/***/ },
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */
/***/ function(module, exports) {

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


/***/ },
/* 14 */
/***/ function(module, exports) {

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


/***/ },
/* 15 */
/***/ function(module, exports) {

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


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

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
	    template: __webpack_require__(17),
	    controller: TbkMainCtrl,
	    controllerAs: 'mainCtrl',
	    transclude: true
	};


/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = "<nav class=\"tbk-header\">\n\t<!-- Bouton titre, lien vers l'acceuil -->\n\t<a ng-click=\"mainCtrl.goAccueil()\" class=\"tbk-header-title\" >\n\t\t<i class=\"material-icons\">flight_takeoff</i>TBK<i class=\"material-icons\">flight_land</i>\n\t</a>\n\t<div ng-show=\"mainCtrl.connectedUser\">\n\t\t<!-- Bouton Voyages -->\n\t\t<a ng-click=\"mainCtrl.goTravels()\" class=\"tbk-header-nav-link\" >\n\t\t\t<i class=\"material-icons\">map</i>\n\t\t\t<span class=\"tbk-header-nav-link-text\">Voyages</span>\n\t\t</a> \n\t\t\n\t\t<a class=\"tbk-nav-travel-name\" ng-show=\"mainCtrl.selectedTravel\">\n\t\t\t<span class=\"tbk-header-nav-link-text\">\n\t\t\t\t{{mainCtrl.selectedTravel.countriesNames}}<br/>({{mainCtrl.selectedTravel.departDate | date:\"yyyy\" }})\n\t\t\t</span>\n\t\t</a>\n\t\n\t\t<a class=\"tbk-header-nav-link\" ng-click=\"mainCtrl.goBudget()\" ng-show=\"mainCtrl.selectedTravel\">\n\t\t\t<i class=\"material-icons\">account_balance_wallet</i>\n\t\t\t<span class=\"tbk-header-nav-link-text\">Budget</span>\n\t\t</a>\n\t\t<a class=\"tbk-header-nav-link\" ng-click=\"mainCtrl.goItineraire()\" ng-show=\"mainCtrl.selectedTravel\">\n\t\t\t<i class=\"material-icons\">directions</i>\n\t\t\t<span class=\"tbk-header-nav-link-text\">Itinéraire</span>\n\t\t</a>\n\t</div>\n\t<div class=\"tbk-header-user dropdow_container\" id=\"connectinLink\" ng-click=\"mainCtrl.showUserMenu = !mainCtrl.showUserMenu\">\n\t\t<span ng-show=\"!mainCtrl.connectedUser\" class=\"tbk-header-nav-link-text\">_login_</span>\n\t\t<span ng-show=\"mainCtrl.connectedUser\" class=\"tbk-header-nav-link-text\">{{mainCtrl.connectedUser.firstname}}</span>\t\n\t</div>\n</nav>\n\n<div class=\"dropdow user-menu\" ng-show=\"mainCtrl.showUserMenu\" off-click=\"mainCtrl.showUserMenu = false\" off-click-if=\"mainCtrl.showUserMenu\">\n\t<ul>\n\t\t<li ng-repeat=\"user in mainCtrl.users\" ng-click=\"mainCtrl.selUser($index)\">{{user.firstname}}</li>\n\t</ul>\n</div>\n\n<div class=\"main\">\n    <div class=\"page-content content\">\n        <ng-transclude></ng-transclude>\n    </div>\n</div>\n";

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/// <reference path="../../../typings/index.d.ts" />
	Object.defineProperty(exports, "__esModule", { value: true });
	var TbkAccueilCtrl = (function () {
	    function TbkAccueilCtrl() {
	    }
	    return TbkAccueilCtrl;
	}());
	exports.TbkAccueil = {
	    template: __webpack_require__(19),
	    controller: TbkAccueilCtrl,
	    controllerAs: 'accueilCtrl',
	    require: { parent: '^tbkMain' }
	};


/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = "<p>ACCUEIL</p>\n<span>Bonjour {{accueilCtrl.parent.connectedUser.firstname}}</span>\n<br/>\n";

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

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
	    template: __webpack_require__(21),
	    controller: TbkAuthenticationCtrl,
	    controllerAs: 'authentCtrl',
	    require: { parent: '^tbkMain' }
	};


/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"modal-window\">\n\t\t\t\n\t<div class=\"sheet-head\">\n\t\t<div class=\"sheet-title\">Se connecter</div>\n\t</div>\n\t\n\t<form novalidate name=\"loginForm\">\n\t\t<div layout='row' layout-fill layout-margin layout-align='start'>\n\t\t\t<md-input-container>\n\t\t\t\t<label>Username :</label>\n\t\t\t\t<input ng-model=\"authentCtrl.credentials.email\" ng-require >\n\t\t\t</md-input-container>\n\t\t\t<md-input-container>\n\t\t\t\t<label>Mot de passe :</label>\n\t\t\t\t<input ng-model=\"authentCtrl.credentials.password\" ng-require >\n\t\t\t</md-input-container>\n\t\t</div>\t\n\t\t<div class=\"actions\">\n\t\t\t<input type=\"button\" value=\"Connexion\" class=\"bouton\" ng-click=\"authentCtrl.login()\" ng-disabled=\"!loginForm.$valid\"/>\n\t\t</div>\n\t</form>\n</div>\n\n";

/***/ }
]);