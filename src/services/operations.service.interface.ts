export interface IOperationsService {
	getOperations(travelId:any): any;
	addOperation(operation: any): any;
	updateOperation(operation : any): any;
	deleteOperation(id: any): any;
}