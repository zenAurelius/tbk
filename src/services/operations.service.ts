
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
	
		operation.accountDebit = operation.accountDebit._id;
		if(operation.accountCredit) { operation.accountCredit = operation.accountCredit._id };
		if(operation.categorie) { operation.categorie = operation.categorie.code };
		
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
	
	public updateAccount(account : any ) {
		return this.$http.put(`/api/accounts/${account._id}`, account,{
						  headers: { Authorization: 'Bearer '+ this.authentication.getToken() }
						  })
			.then( response => response.data )
			.catch( error => console.log("Erreur updateAccount" + error.data) );
	}
}