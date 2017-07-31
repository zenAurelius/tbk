
import { ITravelsService } from './travels.service.interface';
import { IAuthenticationService } from './authentication.service.interface';

import { Travel } from '../domain/Travel';

export class TravelsService implements ITravelsService {
	$http : ng.IHttpService;
	authentication : IAuthenticationService;
	
	constructor($http: ng.IHttpService, authenticationService: IAuthenticationService) {
		this.$http = $http;
		this.authentication = authenticationService;
	}
	
	public getTravels( userId : any ) {
		return this.$http.get(`/api/users/${userId}/travels`,{
						  headers: { Authorization: 'Bearer '+ this.authentication.getToken() }
						  })
			.then( response => {
				let travels : Travel[] = [];
				(response.data['travels'] as Array<any>).forEach(element => {
					travels.push(Travel.fromData(element));
				});
				return travels;
			})
			.catch( error => console.log("Erreur getTravels" + error.data) );
	}
	
	public addTravel(travel : any ) {
		delete travel.days;
		return this.$http.post(`/api/travels`, travel,{
						  headers: { Authorization: 'Bearer '+ this.authentication.getToken() }
						  })
			.then( response => response.data )
			.catch( error => console.log("Erreur addTravels" + error.data) );
	}
	
	public deleteTravel(id: any) {
		return this.$http.delete(`/api/travels/${id}`, {
						  headers: { Authorization: 'Bearer '+ this.authentication.getToken() }
						  })
			.then( response => response.data )
			.catch( error => console.log("Erreur deleteTravel" + error.data) );
	}
	
	public updateTravel(travel : any ) {
		return this.$http.put(`/api/travels/${travel._id}`, travel)
			.then( response => response.data )
			.catch( error => console.log("Erreur updateTravels" + error.data) );
	}
}