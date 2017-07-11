import { IAuthenticationService } from './authentication.service.interface';

export class AuthenticationService implements IAuthenticationService {
	$http : ng.IHttpService;
	$window: ng.IWindowService;
	
	constructor($http: ng.IHttpService, $window: ng.IWindowService) {
		this.$http = $http;
		this.$window = $window;
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
		console.log(user);
		return this.$http({
                method: 'POST',
                url: '/api/login',
                data: user})
            .then(response => {this.saveToken(response.data);});
	};
}
