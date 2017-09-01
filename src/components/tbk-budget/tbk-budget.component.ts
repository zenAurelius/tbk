/// <reference path="../../../typings/index.d.ts" />

import { IAccountsService } from '../../services/accounts.service.interface';
import { IOperationsService } from '../../services/operations.service.interface';

import { Operation } from '../../domain/Operation';
import { Travel } from '../../domain/Travel';

declare var require: any

class TbkBudgetCtrl {
	travel : Travel;
	parent : any;
	accountsService : IAccountsService;
	operationsService: IOperationsService;
	accounts: Array<any>;
	operations : Operation[];
	typeLib: any = {BNK:"Bancaire", CSH:"Espèces", TVL: "Traveler check"};
	accountReady: any = false;
	mainDevise: any = {code:"EUR", symb:"€"};
	changes: { [index: string]: any; };
	selectDayIndex: number = 0;
	$scope: ng.IScope;
	
	// CONSTRUCTOR *******************************************************************************
	/** @ngInject */
	constructor(accountsService: IAccountsService, operationsService: IOperationsService, $scope: ng.IScope) {
		this.accountsService = accountsService;
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
		this.accountReady = false;
		this.getAccounts(this.travel._id).then(() => {
			this.getOperations(this.travel._id).then(() => {
				this.accountReady = true;
			});
		});
	}
		
	// ADD ACCOUNT ********************************************************************************
	public addAccount(account : any) {
		return this.accountsService.addAccount(account)
			.then(() => this.refreshAccount());
	}
	
	// DELETE ACCOUNT *****************************************************************************
	public deleteAccount(id: any) {
		return this.accountsService.deleteAccount(id)
			.then(() => this.refreshAccount());
	}
	
	// GET ACCOUNTS *******************************************************************************
	private getAccounts(travelId : any) {
		var that = this;
		return this.accountsService.getAccounts(travelId)
			.then(function(data : any) {
				data.forEach(element => {
					element.deviseLibelle = element.devise.code;
					if(element.devise.sym) {
						element.deviseLibelle += `(${element.devise.sym})`;
					}
					element.typeLibelle = that.typeLib[element.type];
					element.montant = 0;
				});
				that.accounts = data;
				return that.accounts;
			});
	}
	
	// GET OPERATIONS *****************************************************************************
	private getOperations(travelId: any) {
		var that = this;
		this.accounts.forEach(a => a.montant = 0);
		return this.operationsService.getOperations(travelId)
			.then(function(data : any) {
				let ops: Operation[] = []
				data.forEach(element => {
					let ope = Operation.fromData(element, that.accounts);
					ops.push(ope);
					ope.accountDebit.montant -= ope.montantDebit;
					if(ope.accountCredit) { ope.accountCredit.montant += ope.montantCredit }
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
		
		this.accounts.forEach(a => {
			if(a.devise.code != this.mainDevise.code) {
				let ch = this.changes["EUR" + a.devise.code];
				if(ch){
					let mt = Math.round((a.montant * ch.mt1 / ch.mt2) * 100) / 100;
					a.montantMain = "(" + mt.toString() + " " + this.mainDevise.symb + ")";
				}
			}
		});		
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
		return this.operationsService.updOperation(operation)
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