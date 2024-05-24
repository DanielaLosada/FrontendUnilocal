import { Horario } from "../../class/models/horario";
import { Ubicacion } from "../models/ubicacion";


export class CreatePlaceDto {

    constructor(
        public nombre: string = '',
        public descripcion: string = '',
        public listImagenes: any[] = [],
        public listTelefonos: any[] = [],
        public ubicacion: Ubicacion = {} as Ubicacion,
        public codigoCliente: string = '',
        public listHorarios: Horario[] = [new Horario()],
        public tipoNegocio: any = {} as any,
        public direccion: string = ''
    ) { }
}
