
import { ITravelsService } from './travels.service.interface';
import { Travel } from '../domain/Travel';

export class TravelsService implements ITravelsService {
	$http : ng.IHttpService;
	
	constructor($http: ng.IHttpService) {
		this.$http = $http;
	}
	
	public getTravels( userId : any ) {
		return this.$http.get(`http://localhost:3000/api/users/${userId}/travels`)
			.then( response => {
				let travels : Travel[] = [];
				(response.data as Array<any>).forEach(element => {
					travels.push(Travel.fromData(element));
				});
				return travels;
			})
			.catch( error => console.log("Erreur getTravels" + error.data) );
	}
	
	public addTravel(travel : any ) {
		return this.$http.post(`http://localhost:3000/api/travels`, travel)
			.then( response => response.data )
			.catch( error => console.log("Erreur addTravels" + error.data) );
	}
	
	public deleteTravel(id: any) {
		return this.$http.delete(`http://localhost:3000/api/travels/${id}`)
			.then( response => response.data )
			.catch( error => console.log("Erreur deleteTravel" + error.data) );
	}
	
	public updateTravel(travel : any ) {
		return this.$http.put(`http://localhost:3000/api/travels/${travel._id}`, travel)
			.then( response => response.data )
			.catch( error => console.log("Erreur updateTravels" + error.data) );
	}
}