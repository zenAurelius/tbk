export interface IAccountsService {
	getAccounts(any): any;
	addAccount(account:any): any;
	deleteAccount(id: any): any;
	updateAccount(account:any) : any;
}