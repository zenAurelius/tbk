
import { IUsersService } from './users.service.interface';

export class UsersService implements IUsersService {
	$http : ng.IHttpService;
	
	constructor($http: ng.IHttpService) {
		this.$http = $http;
	}
	
	public getUsers() {
		return this.$http.get('http://localhost:5000/api/users')
			.then( response => response.data )
			.catch( error => console.log("Erreur getUser" + error.data) );
	}
}

	