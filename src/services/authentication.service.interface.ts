export interface IAuthenticationService {
	saveToken(any) : any;
	getToken(): any;
	logout(): any;
	isLoggedIn() : any;
	getLoggedUserId() : any;
}
