
export class TravelDay {
	date: Date;
	libelle: string;
	isFixDate: boolean;
	operations: any[];
	
	constructor(date: Date, libelle: string, isFixDate: boolean) {
		this.date = date;
		this.libelle = libelle;
		this.isFixDate = isFixDate;
		this.operations = [];
	}

}