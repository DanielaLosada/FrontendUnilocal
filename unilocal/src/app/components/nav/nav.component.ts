import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { LoginComponent } from '../Auth/login.component';
import { TokenService } from '../../services/token.service';
import { ClienteService } from '../../services/cliente.service';
import { response } from 'express';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [LoginComponent, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  asideOpen = true;
  profileOpen = false;
  userLoginOn: boolean = false;
  userName: string = '';
  userEmail: string = '';
  userId: string = '';
  userPhoto: string = '';
  payload: any;
  userRole: string = '';
 
  constructor(private tokenService: TokenService,
    private clienteService: ClienteService
  ){}

  toggleAsideOpen() {
    this.asideOpen = !this.asideOpen;
   
  }

  toggleProfileOpen() {
    this.profileOpen = !this.profileOpen;
  }


  ngOnInit(): void {
    const token = this.tokenService.getToken();
    if (token) {
      // Si hay un token presente, establecer userLoginOn como true
      this.userLoginOn = true;
      // Decodificar el payload del token y obtener la foto del usuario
      this.payload = this.tokenService.decodePayload(token);
      this.userName = this.payload.nombre;
      this.userEmail = this.payload.sub;
      this.userId = this.payload.id;
      this.userRole = this.payload.role;
      this.obtenerCliente();
    }
  }

  logout() {
    this.userLoginOn = !this.userLoginOn
    this.tokenService.logout();
  }

  obtenerCliente() {
    this.clienteService.obtenerCliente(this.userId).then((response) => {
      console.log(response.data)
      this.userPhoto = response.data.respuesta.fotoPerfil;
    })
  }

}
