/// <reference path="../../../typings/index.d.ts" />

import { IUsersService } from '../../services/users.service.interface';
import { ICountriesService } from '../../services/countries.service.interface';
import { IAuthenticationService } from '../../services/authentication.service.interface';
declare var require: any

class TbkMainCtrl {
	countriesService:	ICountriesService;
	$location: 			ng.ILocationService;
	connectedUser:	 	any;
	friends:			any[];
	countries: 			any[];
	continents:			any[];
	
	/** @ngInject */
	constructor(usersService: IUsersService, countriesService: ICountriesService, authenticationService : IAuthenticationService, $location: ng.ILocationService) {
		this.usersService = usersService;
		this.countriesService = countriesService;
		this.authentService = authenticationService;
		this.$location = $location;
		this.activate();
	}
	
	public selUser = function(id : any) {
		this.connectedUser = this.users[id];
		this.friends = <any[]>[];
		this.users.forEach( user => {
			if(user != this.connectedUser) {this.friends.push(user)}
		});
		this.showUserMenu = false;
		this.goAccueil();
	}
	
	public setTravel = function(travel : any ) {
		this.selectedTravel = travel;
	}
	
	public goAccueil = function() { this.$location.path('/accueil'); }
	public goTravels = function() { this.$location.path('/travels'); }
	public goBudget = function() { this.$location.path('/budget'); }
	public goItineraire = function() { this.$location.path('/itineraire'); }
	public goLogin = function() { this.$location.path('/login'); }
	
	private activate() {
		//this.getUsers().then(() => { console.log(`users  : ${angular.toJson(this.users)}`); });
		//this.getCountries().then(() => { console.log(`countries  : ${this.countries.length}`); });
		if(this.authentService.isLoggedIn()) {
			this.goAccueil();
		} else {
			this.goLogin();
		}
	}
	
	private getUsers() {
		var that = this;
		return this.usersService.getUsers()
			.then(function(data : any) {
				that.users = data;
				return that.users;
			});
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