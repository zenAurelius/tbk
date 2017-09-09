/// <reference path="../../../typings/index.d.ts" />

import { ITravelsService } from '../../services/travels.service.interface';
import { IOperationsService } from '../../services/operations.service.interface';

import { Operation } from '../../domain/Operation';
import { Travel } from '../../domain/Travel';

declare var require: any

class TbkBudgetCtrl {
	travel : Travel;
	parent : any;
	travelsService : ITravelsService;
	operationsService: IOperationsService;
	devises: Array<any>;
	operations : Operation[];
	bilans : any;
	accountReady: any = false;
	mainDevise: any = {code:"EUR", symb:"€"};
	changes: { [index: string]: any; };
	selectDayIndex: number = 0;
	$scope: ng.IScope;
	
	// CONSTRUCTOR *******************************************************************************
	/** @ngInject */
	constructor(travelsService: ITravelsService, operationsService: IOperationsService, $scope: ng.IScope) {
		this.travelsService = travelsService;
		this.operationsService = operationsService;
		this.$scope = $scope;
	}
	
	// ON INIT ************************************************************************************
	$onInit() {
		if(this.parent.selectedTravel){
			this.travel = this.parent.selectedTravel;
			this.refreshAccount();
		} else {
			this.parent.goAccueil();
		};
	}
	
	// REFRESH ACCOUNT ****************************************************************************
	private refreshAccount() {
		//TODO calcul le bilan.
		this.accountReady = false;
		// this.getAccounts(this.travel._id).then(() => {
		this.getOperations(this.travel._id).then(() => {
			this.accountReady = true;
		});
		// });
	}
		
	// ADD ACCOUNT ********************************************************************************
	public addDevise(devise : any) {
		this.travel.devises.push(devise);
		return this.travelsService.updateTravel(this.travel)
			.then(() => this.refreshAccount());
	}
	
	// DELETE ACCOUNT *****************************************************************************
	public deleteDevise(devise: any) {
		let index = this.travel.devises.indexOf(devise);
		if(index > -1) {
			this.travel.devises.splice(index, 1);
			return this.travelsService.updateTravel(this.travel)
				.then(() => this.refreshAccount());
		}
	}
		
	// GET OPERATIONS *****************************************************************************
	private getOperations(travelId: any) {
		var that = this;
		this.bilans = {};
		return this.operationsService.getOperations(travelId)
			.then(function(data : any) {
				let ops: Operation[] = []
				data.forEach(element => {
					let ope = Operation.fromData(element, that.travel);
					ops.push(ope);
					if(ope.accountDebit && ope.accountDebit.type == "BILAN") {
						let key = ope.accountDebit.code + ope.deviseDebit.code;
						if(!that.bilans[key]) {
							that.bilans[key] = {};
							that.bilans[key].montant = 0.0;
							that.bilans[key].frais = 0.0;
							that.bilans[key].account = ope.accountDebit;
							that.bilans[key].devise = ope.deviseDebit;
						}
						that.bilans[key].montant -= ope.montantDebit;
						if(ope.fraisDebit) {
							that.bilans[key].montant -= ope.fraisDebit;
							that.bilans[key].frais += ope.fraisDebit;
						}
					}
					if(ope.accountCredit && ope.accountCredit.type == "BILAN") {
						let acc = that.bilans[ope.accountDebit.code + ope.deviseCredit.code];
						if(!acc) {
							that.bilans[ope.accountCredit.code + ope.deviseCredit.code] = {};
							that.bilans[ope.accountCredit.code + ope.deviseCredit.code].montant = 0.0;
							that.bilans[ope.accountCredit.code + ope.deviseCredit.code].account = ope.accountCredit;
							that.bilans[ope.accountCredit.code + ope.deviseCredit.code].devise = ope.deviseCredit;
						}
						that.bilans[ope.accountCredit.code + ope.deviseCredit.code].montant += ope.montantCredit;
					}
				});
				that.operations = ops;
				that.getChanges();
				that.setOperationPerDay();
				return that.operations;
			});
	}
	
	// SET OPERATION PER DAY **********************************************************************
	private setOperationPerDay() {
		let travelLength = this.travel.days.length - 1;
		this.travel.days[0].operations = this.operations.filter( ope => ope.date < this.travel.departDate );
		for(let i = 1; i < travelLength; i++) {
			this.travel.days[i].operations = this.operations.filter( ope => (ope.date >= this.travel.days[i].date &&  ope.date < this.travel.days[i+1].date) );
		}
		this.travel.days[travelLength].operations = this.operations.filter( ope => ope.date > this.travel.returnDate );
	}
	
	// SET SELECTED DAY ***************************************************************************
	public setSelectedDay(i: number) {
		this.selectDayIndex = i;
		this.$scope.$apply();
	}
	
	// GET CHANGES ********************************************************************************
	private getChanges() {
		
		this.changes = {};
		let ops = this.operations.filter( ope => ope.type == 'retrait' );
		ops.forEach( ope => {
			let ch = ope.getChange(this.mainDevise.code);
			if(!this.changes[ch.key]) {
				this.changes[ch.key] = {};
				this.changes[ch.key].mt1 = ch.mt1;
				this.changes[ch.key].mt2 = ch.mt2;
			} else {
				this.changes[ch.key].mt1 += ch.mt1;
				this.changes[ch.key].mt2 += ch.mt2;
			}
		});
		
		for (let key in this.changes) {
			var c = this.changes[key];
			if(c.de1 != this.mainDevise.code) {
				let oc = this.changes[this.mainDevise.code + c.de1];
				if(oc){
					let mt1 = oc.mt1 * c.mt1 / oc.mt2;
					let mt2 = c.mt2;
					let nkey = this.mainDevise.code + c.de2;
					if(!this.changes[nkey]) {
						this.changes[nkey] = {};
						this.changes[nkey].mt1 = mt1;
						this.changes[nkey].mt2 = mt2;
					} else {
						this.changes[nkey].mt1 += mt1;
						this.changes[nkey].mt2 += mt2;
					}
				}
			}
		};		
	}
	
	// ADD OPERATION ******************************************************************************
	public addOperation(operation : any) {
		this.accountReady = false;
		return this.operationsService.addOperation(operation)
			.then(() => this.getOperations(this.travel._id)).then(() => {
				this.accountReady = true;
			});
	}
	
	// UPDATE OPERATION ***************************************************************************
	public updateOperation(operation : any) {
		this.accountReady = false;
		return this.operationsService.updateOperation(operation)
			.then(() => this.getOperations(this.travel._id)).then(() => {
				this.accountReady = true;
			});
	}
	
	// DELETE OPERATION ***************************************************************************
	public deleteOperation(id: any) {
		this.accountReady = false;
		return this.operationsService.deleteOperation(id)
			.then(() => this.getOperations(this.travel._id)).then(() => {
				this.accountReady = true;
			});
	}
}

export const TbkBudget : angular.IComponentOptions = {
		template:require('./tbk-budget.html'),
		controller: TbkBudgetCtrl,
		controllerAs: 'budgetCtrl',
		require: {parent: '^tbkMain'}
}