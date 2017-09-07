
import { TravelDay } from './TravelDay';

export class Travel {
	
	public countriesNames: string;
	public usersNames: string;
	public duration: number;
	public days: TravelDay[];
	
	constructor(
		public _id: string,
		public users: any[],
		public countries: any[],
		public departDate: Date,
		public returnDate: Date,
		public devises: any[]
	) {
		this.countries.forEach( c => {
			if(this.countriesNames != null) { 
				this.countriesNames += ', ' + c.name
			} else {
				this.countriesNames = c.name;}
		});
		
		this.users.forEach( u => {
			if(this.usersNames != null) { 
				this.usersNames += ', ' + u.firstname
			} else {
				this.usersNames = u.firstname;}
		});
		
		if(this.returnDate && this.departDate){
			let ONE_DAY = 1000 * 60 * 60 * 24
			let date1_ms = this.returnDate.getTime()
			let date2_ms = this.departDate.getTime()
			let difference_ms = Math.abs(date1_ms - date2_ms)
			this.duration = Math.round(difference_ms/ONE_DAY)
		}
		
		this.setTravelDays();
		if(!this.devises) {
			this.devises = [];
		}
	}
	
	static fromData(data: any){
		
		return new this(data._id, data.users, data.countries, new Date(data.departDate), new Date(data.returnDate), data.devises);
		
	}
	
	static fromScratch(){
		
		let users = [];
		let countries = [];
		return new this(undefined, users, countries, null, null, []);
		
	}
	
	// SET TRAVEL DAYS ************************************************************************************************
	public setTravelDays() {
		this.days= new Array<TravelDay>();
		
		var curday = new Date(this.departDate);
		this.days.push(new TravelDay(new Date(this.departDate), 'avant le départ', false));
		while(curday <= this.returnDate) {
			this.days.push(new TravelDay(new Date(curday), curday.toLocaleDateString(), true));
			curday.setDate(curday.getDate() + 1);
		}
		this.days.push(new TravelDay(new Date(curday), 'après le retour', false));
	}
}