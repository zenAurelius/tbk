/// <reference path="../../../typings/index.d.ts" />
declare var require: any

class TbkBilanCtrl {
	travel: 		any;
	bilans:			any;
	changes:		any;
	selectedDevise:	any;
	onDeviseAdd:	(any) => any;
	onDeviseDelete:	(any) => any;
	devisesList: 	any;
	addedDevise:	any;
	shownAction:	string = 'action';
	
	$onInit = function() {

	}
	
	// GET ALL DEVISES LIBELLE ********************************************************************
	public getAllDevisesLibelle() {
		var lib = "";
		for(let devise of this.travel.devises) {
			if(lib != "") {lib += ", "};
			lib += `${devise.code} (${devise.sym})`;
		}
		
		return lib;
	}
	
	// GET MONTANT LIBELLE ************************************************************************
	public getMontantLibelle(bilan) {
		var lib = (Math.round(bilan.montant * 100) / 100).toString() + " " + bilan.devise.sym;
		if(bilan.account.code == 'BANK' && bilan.frais) {
			lib += ` (dont frais : ${(Math.round(bilan.frais * 100) / 100).toString()} ${bilan.devise.sym})`
		}
		
		if(bilan.devise.code != "EUR") {
			let ch = this.changes["EUR" + bilan.devise.code];
			if(ch){
				let mt = Math.round((bilan.montant * ch.mt1 / ch.mt2) * 100) / 100;
				lib += ` (soit ${mt.toString()} €)`;
			}
		}
		return lib;
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

export const TbkBilan : angular.IComponentOptions = {
	template: require('./tbk-bilan.html'),
	controller: TbkBilanCtrl,
	controllerAs: 'bilanCtrl',
	bindings : {
		travel: '<',
		bilans: '<',
		changes: '<',
		onDeviseAdd: '&',
		onDeviseDelete: '&'
	}
}