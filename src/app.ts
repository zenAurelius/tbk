/// <reference path="../typings/index.d.ts" />
declare var require: any

var $ = require('jquery');

import 'angular';
import 'angular-route';
import 'angular-off-click';
import 'angular-animate';
import 'angular-aria';
import 'angular-material';

import { UsersService }			from './services/users.service';
import { AuthenticationService}	from './services/authentication.service';
//import { TravelsService }		from './services/travels.service';
import { CountriesService }		from './services/countries.service';
//import { AccountsService }		from './services/accounts.service';
// import { OperationsService }		from './services/operations.service';
// import { ItineraryService }		from './services/itinerary.service';

import { TbkMain } 				from './components/tbk-main/tbk-main.component';
import { TbkAccueil } 			from './components/tbk-accueil/tbk-accueil.component';
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
	.service('usersService', UsersService)
	.service('authenticationService', AuthenticationService)
	//.service('travelsService', TravelsService)
	.service('countriesService', CountriesService)
	//.service('accountsService', AccountsService)
	// .service('operationsService', OperationsService)
	// .service('itineraryService', ItineraryService)
	// .directive('tbkMap', TbkMap.factory())
	.component('tbkMain', TbkMain)
	.component('tbkAccueil', TbkAccueil)
	// .component('tbkTravels', TbkTravels)
	// .component('tbkTravelsList', TbkTravelsList)
	// .component('tbkBudget', TbkBudget)
	// .component('tbkAccountsList', TbkAccountsList)
	// .component('tbkOperationsList', TbkOperationsList)
	// .component('tbkBudgetStatistics', TbkBudgetStatistics)
	// .component('tbkItineraire', TbkItineraire)
	// .component('tbkCalendar', TbkCalendar)
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			// .when('/travels', {
					// template: '<tbk-travels></tbk-travels>',
			// })
			.when('/accueil', {
				template: '<tbk-accueil></tbk-accueil>',
			});
			// .when('/budget', {
				// template: '<tbk-budget></tbk-budget>',
			// })
			// .when('/itineraire', {
				// template: '<tbk-itineraire></tbk-itineraire>',
			// });
	}])
	// .config(function($mdDateLocaleProvider) {
		// $mdDateLocaleProvider.formatDate = function(date) {
			// if(date) {
				// return date.getDate().toString() + '/' + (date.getMonth() + 1).toString() + '/' + date.getFullYear().toString();
			// } else {
				// return null;}
		// };

	//});