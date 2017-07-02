
import { IAccountsService } from './accounts.service.interface';

export class AccountsService implements IAccountsService {
	$http : ng.IHttpService;
	
	constructor($http: ng.IHttpService) {
		this.$http = $http;
	}
	
	public getAccounts( travelId : any ) {
		return this.$http.get(`http://localhost:3000/api/travel/${travelId}/accounts`)
			.then( response => response.data )
			.catch( error => console.log("Erreur getAccounts" + error.data) );
	}
	
	public addAccount(account : any ) {
		return this.$http.post(`http://localhost:3000/api/accounts`, account)
			.then( response => response.data )
			.catch( error => console.log("Erreur addAccount" + error.data) );
	}
	
	public deleteAccount(id: any) {
		return this.$http.delete(`http://localhost:3000/api/accounts/${id}`)
			.then( response => response.data )
			.catch( error => console.log("Erreur deleteAccount" + error.data) );
	}
	
	public updateAccount(account : any ) {
		return this.$http.put(`http://localhost:3000/api/accounts/${account._id}`, account)
			.then( response => response.data )
			.catch( error => console.log("Erreur updateAccount" + error.data) );
	}
}