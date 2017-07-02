
import { ICountriesService } from './countries.service.interface';

export class CountriesService implements ICountriesService {
	$http : ng.IHttpService;
	
	constructor($http: ng.IHttpService) {
		this.$http = $http;
	}
	
	public getCountries() {
		return this.$http.get(`http://localhost:3000/api/countries`)
			.then( response => response.data )
			.catch( error => console.log("Erreur getCountries" + error.data) );
	}
}