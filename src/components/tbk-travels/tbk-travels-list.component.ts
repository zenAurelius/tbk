/// <reference path="../../../typings/index.d.ts" />

import { Travel } from '../../domain/Travel';

declare var require: any

class TbkTravelsListCtrl {
	selectedTravel:	Travel;
	onTravelSelect:	(any) => any;
	onTravelAdd:	(any) => any;
	onTravelDelete:	(any) => any;
	onTravelUpdate:	(any) => any;
    travelsList: 	Travel[];
	countries: 		any;
	friends:		any;
	addedTravel:	Travel;
	shownAction:	string = 'action';
	
	$onInit = function() {
		console.log(this.countries);
	}
	
	public selectTravel( travel : Travel ) {
		if(this.selectedTravel && this.selectedTravel._id == travel._id) {
			this.selectedTravel = undefined;
		} else {
			this.selectedTravel = travel;
		}
		this.onTravelSelect({travel: this.selectedTravel});
		this.shownAction = 'action';
	}
	
	public openAddTravel() {
		this.addedTravel = Travel.fromScratch();
		this.shownAction = 'add';
	}
		
	public addTravel() {
		this.onTravelAdd({travel: this.addedTravel});
		this.shownAction = 'action';
	}
		
	public deleteTravel() {
		this.onTravelDelete({id: this.selectedTravel._id});
		this.shownAction = 'action';
	}
	
	public updateTravel() {
		this.onTravelUpdate({travel: this.selectedTravel});
		this.selectedTravel = undefined;
		this.shownAction = 'action';
	}
}

export const TbkTravelsList : angular.IComponentOptions = {
	template: require('./tbk-travels-list.html'),
	controller: TbkTravelsListCtrl,
	controllerAs: 'travelsListCtrl',
	bindings : {
		travelsList: '<',
		countries: '<',
		friends: '<',
		onTravelSelect: '&',
		onTravelAdd: '&',
		onTravelDelete: '&',
		onTravelUpdate: '&'
	}
}