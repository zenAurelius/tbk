export class AuthenticationService implements IAuthenticationService {
	$http : ng.IHttpService;
	$windows: ng.IWindowService;
	
	constructor($http: ng.IHttpService, $windows: ng.IWindowService) {
		this.$http = $http;
		this.$windows = $windows;
	}
	
	public saveToken(token : any) {
		$window.localStorage['tbk-token'] = token;
	};
	
	public getToken() {
		return $window.localStorage['tbk-token'];
	};
	
	public logout() {
		$window.localStorage.removeItem('tbk-token');
	};
	
	public isLoggedIn() {
		var token = getToken();
		var payload;

		if(token){
			payload = token.split('.')[1];
			payload = $window.atob(payload);
			payload = JSON.parse(payload);

			return payload.exp > Date.now() / 1000;
		} else {
			return false;
		}
	};
	
	public login(user) {
		return this.$http.post('/api/login', user)
			then(response => {saveToken(response.data.token);});
	});
};

}