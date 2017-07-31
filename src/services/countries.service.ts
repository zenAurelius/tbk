
import { ICountriesService } from './countries.service.interface';

export class CountriesService implements ICountriesService {
	$http : ng.IHttpService;
	
	constructor($http: ng.IHttpService) {
		this.$http = $http;
	}
	
	public getCountries() {
		return this.$http.get(`/api/countries`)
			.then( response => response.data['countries'] )
			.catch( error => console.log("Erreur getCountries" + error.data) );
	}
}