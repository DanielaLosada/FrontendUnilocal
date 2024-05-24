import { Horario } from "./horario";
import { Ubicacion } from "./ubicacion";

export class Lugar {
    map(arg0: (lugar: Lugar) => Lugar): Lugar[] {
      throw new Error('Method not implemented.');
    }
    constructor(
        public codigo: string = '',
        public descripcion: string = '',
        public nombre: string = '',
        public listHorarios: any[] = [],
        public listImagenes: string[] = [],
        public tipoNegocio: string = '',
        public listTelefonos: string[] = [],
        public estadoRegistro: any = '',
        public codigoCliente: string = '',
        public ubicacion: Ubicacion = new Ubicacion(),
        public listRevisiones: number[] = []

    ){}
}