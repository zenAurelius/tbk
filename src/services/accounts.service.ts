
import { IAccountsService } from './accounts.service.interface';
import { IAuthenticationService } from './authentication.service.interface';

export class AccountsService implements IAccountsService {
	$http : ng.IHttpService;
		authentication : IAuthenticationService;
	
	constructor($http: ng.IHttpService, authenticationService: IAuthenticationService) {
		this.$http = $http;
		this.authentication = authenticationService;
	}
	
	public getAccounts( travelId : any ) {
		return this.$http.get(`/api/travel/${travelId}/accounts`,{
						  headers: { Authorization: 'Bearer '+ this.authentication.getToken() }
						  })
			.then( response => response.data['accounts'] )
			.catch( error => console.log("Erreur getAccounts " + error.data) );
	}
	
	public addAccount(account : any ) {
		return this.$http.post(`/api/accounts`, account,{
						  headers: { Authorization: 'Bearer '+ this.authentication.getToken() }
						  })
			.then( response => response.data )
			.catch( error => console.log("Erreur addAccount " + error.data) );
	}
	
	public deleteAccount(id: any) {
		return this.$http.delete(`/api/accounts/${id}`,{
						  headers: { Authorization: 'Bearer '+ this.authentication.getToken() }
						  })
			.then( response => response.data )
			.catch( error => console.log("Erreur deleteAccount " + error.data) );
	}
	
	public updateAccount(account : any ) {
		return this.$http.put(`/api/accounts/${account._id}`, account,{
						  headers: { Authorization: 'Bearer '+ this.authentication.getToken() }
						  })
			.then( response => response.data )
			.catch( error => console.log("Erreur updateAccount " + error.data) );
	}
}