import { Component } from '@angular/core';
import { Lugar } from '../../class/models/lugar';
import { LocalService } from '../../services/local.service';
import { TokenService } from '../../services/token.service';
import { response } from 'express';

@Component({
  selector: 'app-my-places',
  standalone: true,
  imports: [],
  templateUrl: './my-places.component.html',
  styleUrl: './my-places.component.css'
})
export class MyPlacesComponent {

  lugaresCliente: Lugar = {} as Lugar
  idUser: string = '';

  constructor(private localService: LocalService,
    private tokenService: TokenService
  ){}

  ngOnInit() {
    this.idUser = this.tokenService.getCodigo();
    this.obtenerMisNegocios()
  }

  obtenerMisNegocios() {
    this.localService.listarNegociosUsuario(this.idUser).then((response) => {
      console.log(response.data)
    })
  }

}
