/// <reference path="../../../typings/index.d.ts" />
declare var require: any

import { Travel } 		from '../../domain/Travel';
import { Operation } 	from '../../domain/Operation';

class TbkBudgetStatisticsCtrl {
	travel: Travel;
	changes:  { [index: string]: any; };
	depPerDay : any;
	selectedCategorie : any = '*';
	mainDevise: any = {code:"EUR", symb:"€"};
	accountReady: boolean;
	$parent: any;
	modeTotal: boolean = true;
	totaux: any;
	
	onSelectDay:		(any) => any;
	
	// CONSTRUCTOR ********************************************************************************
    constructor($scope: ng.IScope){
		$scope.$watch('statisticsCtrl.accountReady', (newValue, oldValue) => { 
			if(newValue){
				this.refreshDepPerDay();
			}
		});
	}
	// ON INIT ************************************************************************************
	$onInit = function() {
		
	}
	
	public changeModeTotal = function() {
		this.modeTotal = !this.modeTotal;
	}
	
	public clickDay(evt) {
		this.$parent.statisticsCtrl.onSelectDay({id:evt[0]._index + 1});
	}
	
	public refreshDepPerDay() {
		this.depPerDay = {};
		this.depPerDay.val = [];
		this.depPerDay.lib = [];
		this.depPerDay.val.push([]);
		var d_index = 1;
		this.totaux = {};
		this.totaux.symb = this.mainDevise.symb;
		this.totaux.tot = 0.0;
		this.totaux.sans = 0.0;
		this.totaux.dtCod = [];
		this.totaux.dtLibelle = [];
		this.totaux.dtValTotal = [];
		this.totaux.dtValSans = [];
		// for(let i = 0; i < this.travel.days.length; i++) {
			// let day = this.travel.days[i];
			// let mtDaily = 0;
			// day.operations.filter( ope => ope.type == 'depense' ).forEach( ope => {
				// let addingMt = 0;
				// if(ope.accountDebit.devise.code == this.mainDevise.code) {
					// addingMt = ope.montantDebit;
				// } else {
					// let c = this.changes["EUR" + ope.accountDebit.devise.code];
					// addingMt = ope.montantDebit * c.mt1 / c.mt2;
				// }
				// if((this.selectedCategorie == '*' || ope.categorie.code == this.selectedCategorie.code) 
					// && i > 0 && i < this.travel.days.length - 1)  {
					// mtDaily += addingMt; 
				// }
				
				// this.totaux.tot += addingMt;
				// if(ope.categorie.code != "BAVI") {
					// this.totaux.sans += addingMt;
				// }
				// var d = this.totaux.dtCod.indexOf(ope.categorie.code);
				// if(d < 0) {
					// this.totaux.dtCod.push(ope.categorie.code);
					// this.totaux.dtLibelle.push(ope.categorie.libelle);
					// this.totaux.dtValTotal.push(Math.round(addingMt * 100) / 100);
					// if(ope.categorie.code == "BAVI") {
						// this.totaux.dtValSans.push(0.0);
					// } else {
						// this.totaux.dtValSans.push(Math.round(addingMt * 100) / 100);
					// }
				// } else {
					// this.totaux.dtValTotal[d] += Math.round(addingMt * 100) / 100;
					// if(ope.categorie.code != "BAVI") {
						// this.totaux.dtValSans[d] += Math.round(addingMt * 100) / 100;
					// }
				// }
				
			// });
			// if(i > 0 && i < this.travel.days.length - 1) {
				// this.depPerDay.val[0].push(Math.round(mtDaily * 100) / 100);
				// this.depPerDay.lib.push(d_index.toString());
				// d_index++;
			// }
		// }
		// this.totaux.tot = Math.round(this.totaux.tot * 100) / 100;
			
	}
}
// ************************************************************************************************
// ************************************************************************************************
export const TbkBudgetStatistics : angular.IComponentOptions = {
	template: require('./tbk-budget-statistics.html'),
	controller: TbkBudgetStatisticsCtrl,
	controllerAs: 'statisticsCtrl',
	bindings : {
		travel: '<',
		changes: '<',
		accountReady: '<',
		onSelectDay: '&'
	}
}