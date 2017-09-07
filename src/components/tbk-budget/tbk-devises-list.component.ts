/// <reference path="../../../typings/index.d.ts" />
declare var require: any

class TbkDevisesListCtrl {
	devises: 		any;
	selectedDevise:	any;
	onDeviseAdd:	(any) => any;
	onDeviseDelete:	(any) => any;
	devisesList: 	any;
	addedDevise:	any;
	shownAction:	string = 'action';
	
	$onInit = function() {

	}
	
	// SELECT DEVISE ******************************************************************************
	// Lorsqu'on clique sur une devise, la selectionne sauf si elle est déjà selectionnée
	// auquel cas on ne selectionne plus rien.
	public selectDevise( devise : any, code : any ) {
		if(this.selectedDevise && this.selectedDevise.code == devise._id) {
			this.selectedDevise = undefined;
		} else {
			this.selectedDevise = devise;
		}
		this.shownAction = 'action';
	}
	
	// OPEN ADD DEVISE ****************************************************************************
	public openAddDevise() {
		this.addedDevise = {};
		this.shownAction = 'add';
	}
		
	// ADD DEVISE *********************************************************************************
	public addDevise() {
		// TODO Vérifier qu'elle n'existe pas déjà
		this.onDeviseAdd({devise: this.addedDevise});
		this.shownAction = 'action';
	}
		
	// DELETE DEVISE ******************************************************************************
	public deleteDevise() {
		this.onDeviseDelete({devise: this.selectedDevise});
		this.selectedDevise = undefined;
		this.shownAction = 'action';
	}
}

export const TbkDevisesList : angular.IComponentOptions = {
	template: require('./tbk-devises-list.html'),
	controller: TbkDevisesListCtrl,
	controllerAs: 'devisesListCtrl',
	bindings : {
		devises: '<',
		onDeviseAdd: '&',
		onDeviseDelete: '&'
	}
}