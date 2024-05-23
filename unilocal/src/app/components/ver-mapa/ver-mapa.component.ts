import { Component } from '@angular/core';
import { MapService } from '../../services/map.service';
import { LocalService } from '../../services/local.service';
import { TokenService } from '../../services/token.service';
import { CreatePlaceDto } from '../../class/dto/create-place-dto';
@Component({
  selector: 'app-ver-mapa',
  standalone: true,
  imports: [],
  templateUrl: './ver-mapa.component.html',
  styleUrl: './ver-mapa.component.css'
})
export class VerMapaComponent {

   createPlaceDto : CreatePlaceDto

  constructor(private mapaService: MapService,private localService: LocalService,
    private tokenService: TokenService) {
      this.createPlaceDto = new CreatePlaceDto();
      this.horarios = [new Horario()];
      this.tipos = [];
      this.cargarTipos();
    
  }

  ngOnInit(): void {
    this.mapaService.crearMapa();
    this.mapaService.agregarMarcador().subscribe((marcador) => {
      this.createPlaceDto.location.lat = marcador.lat;
      this.createPlaceDto.location.lng = marcador.lng;
    });
  }

}
