import {accounts} 		from './Accounts';

export class Operation {
	
	constructor(
		public _id: any,
		public travelId: any,
		public date: Date,
		public type: string,
		public accountDebit: any,
		public deviseDebit: any,
		public montantDebit: number,
		public differentDevise: boolean,
		public fraisDebit: number,
		public accountCredit: any,
		public deviseCredit: any,
		public montantCredit: number,
		public description:	string,
		public order: number
	) {}

	static fromData(data: any, travel: any) {
	
		var accountCredit;
		var accountDebit;
		if(data.accountCredit) { 
			for(let a of accounts.bilan) {
				if(a.code == data.accountCredit) { accountCredit = a; }
				if(a.code == data.accountDebit) { accountDebit = a; }
			}
			for(let a of accounts.charge) {
				if(a.code == data.accountCredit) { accountCredit = a; }
				if(a.code == data.accountDebit) { accountDebit = a; }
			} 
		}
		
		var deviseDebit;
		var deviseCredit;
		for(let d of travel.devises) {
			if(data.deviseDebit == d.code) { deviseDebit = d}
			if(data.deviseCredit == d.code) { deviseCredit = d}
		}
		
		let date = new Date(data.date);
		return new this(data._id, data.travelId, date, data.type, accountDebit, deviseDebit, data.montantDebit, data.differentDevise, data.fraisDebit, accountCredit, deviseCredit, data.montantCredit, data.description, data.order);
	}
	
	static fromScratch(travelId: any, date: Date, order: number) {
		return new this(undefined, travelId, date, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, order);
	}
	
	
	public getChange(mainDevise: string) {
		
		let change: any = {};
				
		if(this.deviseDebit.code == mainDevise ){
			change.key = this.deviseDebit.code + this.deviseCredit.code;
			change.mt1 = this.montantDebit;
			change.mt2 = this.montantCredit;
			change.de1 = this.deviseDebit.code;
			change.de1 = this.deviseCredit.code;
		} else if( this.deviseCredit.code == mainDevise) {
			change.key = this.deviseCredit.code + this.deviseDebit.code;
			change.mt1 = this.montantCredit;
			change.mt2 = this.montantDebit;
			change.de1 = this.deviseCredit.code;
			change.de1 = this.deviseDebit.code;
		} else if( this.deviseDebit.code > this.deviseCredit.code) {
			change.key = this.deviseDebit.code + this.deviseCredit.code;
			change.mt1 = this.montantDebit;
			change.mt2 = this.montantCredit;
			change.de1 = this.deviseDebit.code;
			change.de1 = this.deviseCredit.code;
		} else {
			change.key = this.deviseCredit.code + this.deviseDebit.code;
			change.mt1 = this.montantCredit;
			change.mt2 = this.montantDebit;
			change.de1 = this.deviseCredit.code;
			change.de1 = this.deviseDebit.code;
		}
		
		return change;
	}
}