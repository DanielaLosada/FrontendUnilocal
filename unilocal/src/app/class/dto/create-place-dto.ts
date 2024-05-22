import { Horario } from "../../class/models/horario";
import { Location } from "../../class/models/location";


export class CreatePlaceDto {

    constructor(
        public description: string = '',
        public name: string = '',
        public schedules: Horario[] = [new Horario()],
        public images: any[] = [],
        public businessType: any = '',
        public owner: string = '',
        public location: Location = new Location,
        public phones: any[] = []
    ) { }
}
