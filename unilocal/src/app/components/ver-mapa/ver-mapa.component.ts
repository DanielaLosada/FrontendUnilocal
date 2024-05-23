import { Component } from '@angular/core';
import { MapService } from '../../services/map.service';
import { LocalService } from '../../services/local.service';
import { TokenService } from '../../services/token.service';
import { CreatePlaceDto } from '../../class/dto/create-place-dto';
import { Horario } from '../../class/models/horario';
import { Tipo } from '../../class/models/tipo';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-ver-mapa',
  standalone: true,
  imports: [NgFor],
  templateUrl: './ver-mapa.component.html',
  styleUrl: './ver-mapa.component.css'
})
export class VerMapaComponent {

   createPlaceDto : CreatePlaceDto

   private cargarTipos() {
    // this.publicService.listarTiposNegocio().then((response) => {
    //   // Iterar sobre cada objeto Tipo en response.data
    //   this.tipos = response.data.map((tipo: Tipo) => tipo.tipo);
    // })
    // .catch((error) => {
    //   console.log("Error al obtener los tipos")
    // })
  }
   

  constructor(private mapaService: MapService,private localService: LocalService,
    private tokenService: TokenService) {
      this.createPlaceDto = new CreatePlaceDto();
  }

  ngOnInit(): void {
    this.mapaService.crearMapa();
    this.mapaService.agregarMarcador().subscribe((marcador) => {
      this.createPlaceDto.location.lat = marcador.lat;
      this.createPlaceDto.location.lng = marcador.lng;
    });
  }

}
