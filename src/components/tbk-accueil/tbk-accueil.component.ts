/// <reference path="../../../typings/index.d.ts" />

declare var require: any

class TbkAccueilCtrl {
	parent:	any;
}

export const TbkAccueil : angular.IComponentOptions = {
		template:		require('./tbk-accueil.html'),
		controller: 	TbkAccueilCtrl,
		controllerAs: 	'accueilCtrl',
		require: {parent: '^tbkMain'}
}
	

	
