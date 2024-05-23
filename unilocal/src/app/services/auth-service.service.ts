import { Injectable } from '@angular/core';
import { RegisterDto } from '../class/dto/register-dto';
import { MensajeAuthDto } from '../class/dto/mensaje-auth-dto';
import { ImagenService } from './imagen.service';
import axios from 'axios';
import { environment } from '../environments/environments';
import { TokenService } from './token.service';
import { LoginDto } from '../class/dto/login-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private imagenService: ImagenService,
    private tokenService: TokenService
  ) { }

    registrarUsuario(registroClienteDTO: RegisterDto): Promise<any> {
    return new Promise((resolve, reject) => {
      this.imagenService.subirImagen(registroClienteDTO.fotoPerfil)
        .then((response) => {
          const cloudinaryURL = response.data.respuesta.secure_url;
          registroClienteDTO.fotoPerfil = cloudinaryURL;

          axios.post<MensajeAuthDto>(`${environment.urlAuth}/registrar-cliente`, registroClienteDTO)
            .then((response) => {
              const payload = this.tokenService.decodePayload(response.data.respuesta.token);
              const id = payload.id;
              this.tokenService.signup(response.data.respuesta.token, id);
              resolve(response.data.respuesta); // Resuelve la promesa con los datos de la respuesta
            })
            .catch((error) => {
              console.error('Error al registrar usuario:', error);
              reject(error); // Rechaza la promesa con el error
            });

        })
        .catch((error) => {
          console.error("No se pudo subir la foto", error);
          reject(error); // Rechaza la promesa con el error
        });
    });
  }

  loginUsuario(LoginDto: LoginDto) {
    axios.post<MensajeAuthDto>(`${environment.urlAuth}/login-cliente`, LoginDto)
      .then((response) => {
        const payload = this.tokenService.decodePayload(response.data.respuesta.token);
        const id = payload.id;
        this.tokenService.loginUser(response.data.respuesta.token, id);
        console.log("Inicio sesion")
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }

  loginMod(LoginDto: LoginDto) {
    axios.post<MensajeAuthDto>(`${environment.urlAuth}/login-administrador`, LoginDto)
      .then((response) => {
        const payload = this.tokenService.decodePayload(response.data.respuesta.token);
        const id = payload.id;
        this.tokenService.loginMod(response.data.respuesta.token, id);
        
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }

  obtenerUsuarios() {
    return axios.get(`${environment.urlClient}/get-all-users`);
  }
  
  refresh() {
    return axios.post<MensajeAuthDto>('/refresh', this.tokenService.getToken()).then((response) => {
      this.tokenService.setToken(response.data.respuesta);
    }).catch((error) => {
      console.log('No se pudo actualizar el token:', error);
    });
  }

}
