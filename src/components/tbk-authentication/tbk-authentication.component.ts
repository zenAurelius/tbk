/// <reference path="../../../typings/index.d.ts" />

import { IAuthenticationService } from '../../services/authentication.service.interface';
declare var require: any

class TbkAuthenticationCtrl {
	parent:	any;
    authentService:		IAuthenticationService;
    credentials: any = { username: "", password: ""};
    
    /** @ngInject */
	constructor(authenticationService: IAuthenticationService) {
		this.authentService = authenticationService;
	};
    
    public login = function () {
        console.log(this.credentials);
		var that = this;
        this.authentService.login(this.credentials)
            .then( () => {
				var usrid = this.authentService.getLoggedUserId();
				console.log(usrid);
				this.parent.selUser(usrid);
            })
            .catch(function(err){
				console.log(err);
				alert(err.data);
            });
    };
	
	public isLoggedIn = function() {
		return false;
	}
    
}

export const TbkAuthentication : angular.IComponentOptions = {
		template:		require('./tbk-authentication.html'),
		controller: 	TbkAuthenticationCtrl,
		controllerAs: 	'authentCtrl',
		require: {parent: '^tbkMain'}
}