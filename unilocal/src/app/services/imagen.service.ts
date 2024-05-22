import { Injectable } from '@angular/core';
import axios from 'axios';
import { MensajeAuthDto } from '../class/dto/mensaje-auth-dto';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ImagenService{

  constructor() { }

  subirImagen(photo: any) {
    const formData = new FormData();
    formData.append('file', photo);
    return axios.post<MensajeAuthDto>(`${environment.urlImagen}/subir`, formData);
  }
}
