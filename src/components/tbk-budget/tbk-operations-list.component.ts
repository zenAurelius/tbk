/// <reference path="../../../typings/index.d.ts" />
declare var require: any

import { TravelDay } 	from '../../domain/TravelDay';
import { Travel } 		from '../../domain/Travel';
import { Operation } 	from '../../domain/Operation';


class TbkOperationsListCtrl {
	travel: Travel;
	days: 				TravelDay[];
	accounts:			any[];
	travelLength: 		number;
	selectDayIndex: 	number;
	shownAction:		string = 'action';
	addedOperation: 	Operation;
	selectedDay: 		TravelDay;
	selectedOperation:	Operation;
	categories: any[] = Operation.categories;
	
	onOperationAdd:		(any) => any;
	onOperationDelete:	(any) => any;

	
	// CONSTRUCTOR ********************************************************************************
    constructor($scope: ng.IScope){
		$scope.$watch('operationsListCtrl.selectDayIndex', (newValue, oldValue) => { 
			if(newValue != oldValue){
				this.selectedDay = this.days[this.selectDayIndex];
				this.shownAction = 'action';
			}
		});
	}
	
	// ON INIT ************************************************************************************
	$onInit = function() {
		this.days = this.travel.days;
		this.travelLength = this.days.length - 1;
		this.selectedDay = this.days[this.selectDayIndex];
	}
	
	// PREV DAY ***********************************************************************************
	public prevDay() {
		if(this.selectDayIndex > 0) { this.selectDayIndex--; }
	}
	
	// NEXT DAY ***********************************************************************************
	public nextDay() {
		if(this.selectDayIndex < this.travelLength) { this.selectDayIndex++; }
	}
	
	// OPEN ADD OPERATION *************************************************************************
	public openAddOperation() {
		this.addedOperation = Operation.fromScratch(this.travel._id, this.selectedDay.date, this.selectedDay.operations.length);
	}
	
	// OPEN ADD DEPENSE ***************************************************************************
	public openAddDepense() {
		this.openAddOperation();
		this.addedOperation.type = 'depense';
		this.shownAction = 'addDepense';
	}

	// OPEN ADD RETRAIT ***************************************************************************
	public openAddRetrait() {
		this.openAddOperation();
		this.addedOperation.type = 'retrait';
		this.shownAction = 'addRetrait';
	}
	
	// ADD OPERATION ******************************************************************************
	public addOperation() {
		this.onOperationAdd({operation: this.addedOperation});
		this.shownAction = 'action';
		
	}
	
	// DELETE OPERATION ***************************************************************************
	public deleteOperation() {
		this.onOperationDelete({id: this.selectedOperation._id});
		this.selectedOperation = undefined;
		this.shownAction = 'action';
	}
	
	// SELECT OPERATION ***************************************************************************
	public selectOperation( operation : any) {
		if(this.selectedOperation && this.selectedOperation._id == operation._id) {
			this.selectedOperation = undefined;
		} else {
			this.selectedOperation = operation;
		}
		this.shownAction = 'action';
	}
}


// ************************************************************************************************
// ************************************************************************************************
export const TbkOperationsList : angular.IComponentOptions = {
	template: require('./tbk-operations-list.html'),
	controller: TbkOperationsListCtrl,
	controllerAs: 'operationsListCtrl',
	bindings : {
		travel: '<',
		accounts: '<',
		selectDayIndex: '=',
		onOperationAdd: '&',
		onOperationDelete: '&'
	}
}