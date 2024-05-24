import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { LoginComponent } from '../Auth/login.component';
import { TokenService } from '../../services/token.service';
import { ClienteService } from '../../services/cliente.service';
import { response } from 'express';
import { RouterModule } from '@angular/router';
import { MyPlacesComponent } from '../my-places/my-places.component';
import { VerMapaComponent } from '../ver-mapa/ver-mapa.component';
import { RegisterBusinessComponent } from '../business/register-business/register-business.component';
import { Lugar } from '../../class/models/lugar';
import { LocalService } from '../../services/local.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [LoginComponent,
    CommonModule,
    RouterModule,
    MyPlacesComponent,
    VerMapaComponent,
  RegisterBusinessComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  asideOpen = true;
  profileOpen = false;
  userLoginOn: boolean = false;
  myPlaces: boolean = false;
  myFavorites: boolean = false;
  myDashboard: boolean = false;
  myMap: boolean = false;
  myCreate: boolean = false;
  userName: string = '';
  userEmail: string = '';
  userId: string = '';
  userPhoto: string = '';
  payload: any;
  userRole: string = '';
  lugaresCliente!: any[]
  detailOpen:boolean = false
 
  constructor(private tokenService: TokenService,
    private clienteService: ClienteService,
    private localService: LocalService
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
      this.obtenerMisNegocios()
    }
  }

  logout() {
    this.userLoginOn = false
    this.tokenService.logout();
  }

  obtenerCliente() {
    this.clienteService.obtenerCliente(this.userId).then((response) => {
      this.userPhoto = response.data.respuesta.fotoPerfil;
    })
  }

  obtenerMisNegocios() {
    this.localService.listarNegociosUsuario(this.userId).then((response) => {
      this.lugaresCliente = response.data.respuesta.map((lugar: Lugar) => lugar);
      console.log(this.lugaresCliente)
    })
  }

  abrirMyPlaces() {
    this.myPlaces = !this.myPlaces;
    this.myCreate = false;
    this.myDashboard = false;
    this.myFavorites = false;
    this.myMap = false;
  }

  abrirMyFavorites() {
    this.myPlaces = false;
    this.myCreate = false;
    this.myDashboard = false;
    this.myFavorites = !this.myFavorites;
    this.myMap = false;
  }

  abrirMapa() {
    this.myPlaces = false;
    this.myCreate = false;
    this.myDashboard = false;
    this.myFavorites = false;
    this.myMap = !this.myMap;
  }

  abrirRegistrarNegocio() {
    this.myPlaces = false;
    this.myCreate = !this.myCreate;
    this.myDashboard = false;
    this.myFavorites = false;
    this.myMap = false;
  }

  abrirDashboard() {
    this.myPlaces = false;
    this.myCreate = false;
    this.myDashboard = !this.myDashboard;
    this.myFavorites = false;
    this.myMap = false;
  }
  abrirDetail() {
    this.detailOpen = !this.detailOpen
    this.myPlaces = false;
    this.myCreate = false;
    this.myDashboard = false;
    this.myFavorites = false;
    this.myMap = false;
  }

}
