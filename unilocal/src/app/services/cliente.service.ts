import { Injectable } from '@angular/core';
import axios, { AxiosRequestConfig } from 'axios';
import { environment } from '../environments/environments';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private tokenService: TokenService) { }


  obtenerCliente(id: string) {
        // Configurar el token JWT en el encabezado Authorization
    const token = this.tokenService.getToken(); // Función para obtener el token JWT
    const headers: AxiosRequestConfig['headers'] = {
      Authorization: `Bearer ${token}`
    };
    return axios.get(`${environment.urlClient}/obtener-cliente/${id}`, {headers})
  }


}
