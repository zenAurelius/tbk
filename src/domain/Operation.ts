
export class Operation {

	public static categories: any[] = [{code:"BAVI", libelle:"Billet d'avion"}, {code:"TRAS", libelle:"Transport"}, {code:"LOGT", libelle:"Logement"}, {code:"FOOD", libelle:"Nourriture"}, {code:"VIST", libelle:"Visite"}, {code:"SOVN", libelle:"Souvenirs"}];
	
	constructor(
		public _id: any,
		public travelId: any,
		public date: Date,
		public type: string,
		public accountDebit: any,
		public montantDebit: number,
		public accountCredit: any,
		public montantCredit: number,
		public description:	string,
		public categorie: any,
		public order: number
	) {}

	static fromData(data: any, accounts: Array<any>) {
		let date = new Date(data.date);
		let accountDebit = null;
		for(let a of accounts) {
			if(a._id == data.accountDebit) { accountDebit = a; }
		}
		let accountCredit = null;
		if(data.accountCredit) { 
			for(let a of accounts) {
				if(a._id == data.accountCredit) { accountCredit = a; }
			} 
		}
		let categorie = null;
		if(data.categorie)  { 
			for(let c of Operation.categories) {
				if(c.code == data.categorie) { categorie = c; }
			}
		}
		
		return new this(data._id, data.travelId, date, data.type, accountDebit, data.montantDebit, accountCredit, data.montantCredit, data.description, categorie, data.order);
	}
	
	static fromScratch(travelId: any, date: Date, order: number) {
		return new this(undefined, travelId, date, undefined, undefined, undefined, undefined, undefined, undefined, undefined, order);
	}
	
	
	public getChange(mainDevise: string) {
		
		let change: any = {};
				
		if(this.accountDebit.devise.code == mainDevise ){
			change.key = this.accountDebit.devise.code + this.accountCredit.devise.code;
			change.mt1 = this.montantDebit;
			change.mt2 = this.montantCredit;
			change.de1 = this.accountDebit.devise.code;
			change.de1 = this.accountCredit.devise.code;
		} else if( this.accountCredit.devise.code == mainDevise) {
			change.key = this.accountCredit.devise.code + this.accountDebit.devise.code;
			change.mt1 = this.montantCredit;
			change.mt2 = this.montantDebit;
			change.de1 = this.accountCredit.devise.code;
			change.de1 = this.accountDebit.devise.code;
		} else if( this.accountDebit.devise.code > this.accountCredit.devise.code) {
			change.key = this.accountDebit.devise.code + this.accountCredit.devise.code;
			change.mt1 = this.montantDebit;
			change.mt2 = this.montantCredit;
			change.de1 = this.accountDebit.devise.code;
			change.de1 = this.accountCredit.devise.code;
		} else {
			change.key = this.accountCredit.devise.code + this.accountDebit.devise.code;
			change.mt1 = this.montantCredit;
			change.mt2 = this.montantDebit;
			change.de1 = this.accountCredit.devise.code;
			change.de1 = this.accountDebit.devise.code;
		}
		
		return change;
	}
}