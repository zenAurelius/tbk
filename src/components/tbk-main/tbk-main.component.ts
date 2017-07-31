/// <reference path="../../../typings/index.d.ts" />

import { IUsersService } from '../../services/users.service.interface';
import { ICountriesService } from '../../services/countries.service.interface';
import { IAuthenticationService } from '../../services/authentication.service.interface';
declare var require: any

class TbkMainCtrl {
	countriesService:	ICountriesService;
	authentService:		IAuthenticationService;
	usersService:		IUsersService;
	$location: 			ng.ILocationService;
	connectedUser:	 	any;
	friends:			any[];
	countries: 			any[];
	continents:			any[];
	
	/** @ngInject */
	constructor(usersService: IUsersService, countriesService: ICountriesService, authenticationService : IAuthenticationService, $location: ng.ILocationService) {
		this.countriesService = countriesService;
		this.authentService = authenticationService;
		this.usersService = usersService;
		this.$location = $location;
		this.activate();
	}
	
	public selUser = function(id : any) {
		this.usersService.getUser(id)
		.then( (response) => {
			this.connectedUser = response.user;
			this.usersService.getFriends(id)
				.then( friends => {
					this.friends = friends;
					this.goAccueil();
				});
		});
		
		//this.friends = <any[]>[];
		//this.users.forEach( user => {
		//	if(user != this.connectedUser) {this.friends.push(user)}
		//});
	}
	
	public setTravel = function(travel : any ) {
		this.selectedTravel = travel;
	}
	
	public logout = function() {
		this.authentService.logout();
		this.connectedUser = null;
		this.showUserMenu = false;
		this.selectedTravel = null;
		this.goLogin();
	}
	
	public goAccueil = function() { this.$location.path('/accueil'); }
	public goTravels = function() { this.$location.path('/travels'); }
	public goBudget = function() { this.$location.path('/budget'); }
	public goItineraire = function() { this.$location.path('/itineraire'); }
	public goLogin = function() { this.$location.path('/login'); }
	
	private activate() {
		//this.getUsers().then(() => { console.log(`users  : ${angular.toJson(this.users)}`); });
		this.getCountries().then(() => { console.log(`countries  : ${this.countries.length}`); });
		if(this.authentService.isLoggedIn()) {
			this.selUser(this.authentService.getLoggedUserId());
			this.goAccueil();
		} else {
			this.goLogin();
		}
	}
	
	
	private getCountries() {
		var that = this;
		return this.countriesService.getCountries()
			.then(function(data : any) {
				that.countries = <any[]>[];
				that.continents = <any[]>[];
				data.forEach( d => {
					if(d.type == 'p'){ that.countries.push(d) }
					if(d.type == 'c'){ that.continents.push(d) }
				})
				return that.countries;
			});
	}
}

export const TbkMain : angular.IComponentOptions = {
  template: require('./tbk-main.html'),
  controller: TbkMainCtrl,
  controllerAs: 'mainCtrl',
  transclude: true
};