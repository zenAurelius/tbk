/// <reference path="../../../typings/index.d.ts" />

import { ITravelsService } from '../../services/travels.service.interface';

import { Travel } from '../../domain/Travel';

declare var require: any
var $ = require('jquery');

class TbkTravelsCtrl {
	userId: any;
	travels : Travel[];
	parent : any;
	travelsService : ITravelsService;
	mapData : any;
	
	/** @ngInject */
	constructor(travelsService: ITravelsService) {
		this.travelsService = travelsService;
	}
	
	$onInit() {
		if(this.parent.connectedUser){
			this.userId = this.parent.connectedUser._id;
			return this.getTravels(this.userId).then(() => {
				console.log(`travels  : ${angular.toJson(this.travels)}`);
			})
		} else {
			this.parent.goAccueil();
		};
	}
	
	public selectTravel( travel : any ) {
		this.parent.setTravel(travel);
		var mapObject = $('#map').vectorMap('get', 'mapObject');
		mapObject.clearSelectedRegions();
		if(travel) {
			let countriesCode = travel.countries.map(function(e) {return e._id_2;});
			mapObject.setSelectedRegions(countriesCode);
		}
	}
	
	public addTravel(travel : any) {
		travel.users.push(this.parent.connectedUser);
		return this.travelsService.addTravel(travel)
			.then(() => this.getTravels(this.userId));
	}
	
	public updateTravel(travel : any) {
		return this.travelsService.updateTravel(travel)
			.then(() => this.getTravels(this.userId));
	}
	
	public deleteTravel(id : any) {
		return this.travelsService.deleteTravel(id)
			.then(() => this.getTravels(this.userId));
	}
	
	private getTravels(userId : any) {
		var that = this;
		that.travels = [];
		return this.travelsService.getTravels(userId)
			.then(function(data : any) {
				that.travels = data;
				that.refreshTravels();
				return that.travels;
			});
	} 
	
	private refreshTravels() {
		let data = {};
		for(let travel of this.travels) {
			for(let country of travel.countries) {
				if(data[country._id_2]) {
					data[country._id_2] += 1;
				} else {
					data[country._id_2] = 1;
				}
			}
		}
		this.mapData = data;
		console.log(this.mapData);
	}
	

}

export const TbkTravels : angular.IComponentOptions = {
		template:require('./tbk-travels.html'),
		controller: TbkTravelsCtrl,
		controllerAs: 'travelsCtrl',
		require: {parent: '^tbkMain'}
}

