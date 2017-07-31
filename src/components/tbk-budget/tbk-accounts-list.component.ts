/// <reference path="../../../typings/index.d.ts" />
declare var require: any

class TbkAccountsListCtrl {
	travel: any;
	accounts: any;
	selectedAccount:	any;
	onAccountAdd:	(any) => any;
	onAccountDelete:	(any) => any;
	onAccountUpdate:	(any) => any;
    accountsList: 	any;
	addedAccount:	any;
	shownAction:	string = 'action';
	
	$onInit = function() {

	}
	
	public selectAccount( account : any, id : any ) {
		if(this.selectedAccount && this.selectedAccount._id == account._id) {
			this.selectedAccount = undefined;
		} else {
			this.selectedAccount = account;
		}
		this.shownAction = 'action';
	}
	
	public openAddAccount() {
		this.addedAccount = {};
		this.addedAccount.travelId = this.travel._id;
		this.addedAccount.devise = {};
		this.addedAccount.type = 'BNK';
		this.shownAction = 'add';
	}
		
	public addAccount() {
		this.onAccountAdd({account: this.addedAccount});
		this.shownAction = 'action';
	}
		
	public deleteAccount() {
		this.onAccountDelete({id: this.selectedAccount._id});
		this.selectedAccount = undefined;
		this.shownAction = 'action';
	}
	
	public updateAccount() {
		this.onAccountUpdate({account: this.selectedAccount});
		this.selectedAccount = undefined;
		this.shownAction = 'action';
	}
}

export const TbkAccountsList : angular.IComponentOptions = {
	template: require('./tbk-accounts-list.html'),
	controller: TbkAccountsListCtrl,
	controllerAs: 'accountsListCtrl',
	bindings : {
		travel: '<',
		accounts: '<',
		onAccountAdd: '&',
		onAccountDelete: '&',
		onAccountUpdate: '&'
	}
}