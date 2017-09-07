
import { IOperationsService } from './operations.service.interface';
import { IAuthenticationService } from './authentication.service.interface';

export class OperationsService implements IOperationsService {
	$http : ng.IHttpService;
	authentication : IAuthenticationService;
	
	constructor($http: ng.IHttpService, authenticationService: IAuthenticationService) {
		this.$http = $http;
		this.authentication = authenticationService;
	}
	
	public getOperations( travelId : any ) {
		return this.$http.get(`/api/account/${travelId}/operations`,{
						  headers: { Authorization: 'Bearer '+ this.authentication.getToken() }
						  })
			.then( response => response.data['operations'] )
			.catch( error => console.log("Erreur getOperations" + error.data) );
	}
	
	public addOperation(operation : any ) {
		this.cleanForDB(operation);
		return this.$http.post(`/api/operations`, operation,{
						  headers: { Authorization: 'Bearer '+ this.authentication.getToken() }
						  })
			.then( response => response.data )
			.catch( error => console.log("Erreur addOperation" + error.data) );
	}
	
	public deleteOperation(id: any) {
		return this.$http.delete(`/api/operations/${id}`,{
						  headers: { Authorization: 'Bearer '+ this.authentication.getToken() }
						  })
			.then( response => response.data )
			.catch( error => console.log("Erreur deleteOperation" + error.data) );
	}
	
	public updateOperation(operation : any ) {
		this.cleanForDB(operation);
		return this.$http.put(`/api/operations`, operation,{
						  headers: { Authorization: 'Bearer '+ this.authentication.getToken() }
						  })
			.then( response => response.data )
			.catch( error => console.log("Erreur updateOperation" + error.data) );
	}
	
	public updateAccount(account : any ) {
		return this.$http.put(`/api/accounts/${account._id}`, account,{
						  headers: { Authorization: 'Bearer '+ this.authentication.getToken() }
						  })
			.then( response => response.data )
			.catch( error => console.log("Erreur updateAccount" + error.data) );
	}
	
	private cleanForDB(operation) {
		operation.accountCredit = operation.accountCredit.code;
		operation.accountDebit = operation.accountDebit.code;
		operation.deviseDebit = operation.deviseDebit.code;
		if(operation.deviseCredit) {
			operation.deviseCredit = operation.deviseCredit.code;
		} else {
			operation.deviseCredit = operation.deviseDebit;
		}
	}
}