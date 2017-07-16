
import { IUsersService } from './users.service.interface';
import { IAuthenticationService } from './authentication.service.interface';

export class UsersService implements IUsersService {
	$http : ng.IHttpService;
	authentication : IAuthenticationService;
	
	constructor($http: ng.IHttpService, authenticationService: IAuthenticationService) {
		this.$http = $http;
		this.authentication = authenticationService;
	}
	
	public getUser(id) {
		return this.$http.get(`/api/users/${id}`, {
						  headers: { Authorization: 'Bearer '+ this.authentication.getToken() }
						  })
			.then( response => {
				console.log(response.data);
				return response.data;
			})
			.catch( error => console.log("Erreur getUser" + error.data) );
	}
}

	