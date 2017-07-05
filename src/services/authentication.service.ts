import { IAuthenticationService } from './authentication.service.interface';

export class AuthenticationService implements IAuthenticationService {
	$http : ng.IHttpService;
	$windows: ng.IWindowService;
	
	constructor($http: ng.IHttpService, $windows: ng.IWindowService) {
		this.$http = $http;
		this.$windows = $windows;
	};
	
	public saveToken(token : any) {
		this.$window.localStorage['tbk-token'] = token;
	};
	
	public getToken() {
		return this.$window.localStorage['tbk-token'];
	};
	
	public logout() {
		this.$window.localStorage.removeItem('tbk-token');
	};
	
	public isLoggedIn() {
		var token = this.getToken();
		var payload;

		if(token){
			payload = token.split('.')[1];
			payload = this.$window.atob(payload);
			payload = JSON.parse(payload);

			return payload.exp > Date.now() / 1000;
		} else {
			return false;
		}
	};
	
	public login(user) {
		return this.$http.post('/api/login', user)
			.then(response => {this.saveToken(response.data.token);});
	};
}
