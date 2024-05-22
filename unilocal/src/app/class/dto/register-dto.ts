export class RegisterDto {
    constructor(
        public nombre: string = '',
        public fotoPerfil: any = '',
        public nickName: string = '',
        public email: string = '',
        public password: string = '',
        public ciudadRecidencia: string = ''
    ){}
}
