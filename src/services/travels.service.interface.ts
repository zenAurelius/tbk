import { Travel } from '../domain/Travel';

export interface ITravelsService {
	getTravels(any): any;
	addTravel(travel:any): any;
	deleteTravel(id: any): any;
	updateTravel(travel:any) : any;
}