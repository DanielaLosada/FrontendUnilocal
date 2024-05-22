export class RegisterDto {
    constructor(
        public nombre: string = '',
        public fotoPerfil: any = '',
        public nickname: string = '',
        public email: string = '',
        public password: string = '',
        public ciudadResidencia: string = ''
    ){}
}
