/// <reference path="../../../typings/index.d.ts" />

declare var require: any

class TbkAuthenticationCtrl {
	parent:	any;
}

export const TbkAuthentication : angular.IComponentOptions = {
		template:		require('./tbk-authentication.html'),
		controller: 	TbkAuthenticationCtrl,
		controllerAs: 	'authentCtrl',
		require: {parent: '^tbkMain'}
}
	

	
