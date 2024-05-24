import { Component } from '@angular/core';
import { MapService } from '../../services/map.service';
// import { LocalService } from '../../services/local.service';
// import { TokenService } from '../../services/token.service';
import { CreatePlaceDto } from '../../class/dto/create-place-dto';
import { NgFor, NgIf } from '@angular/common';
import { PlacesService } from '../../services/places.service';
import { Feature } from '../../interfaces/places';
import {  Router, RouterModule } from '@angular/router';



@Component({
  selector: 'app-ver-mapa',
  standalone: true,
  imports: [NgFor,NgIf, RouterModule],
  templateUrl: './ver-mapa.component.html',
  styleUrl: './ver-mapa.component.css'
})
export class VerMapaComponent {

   createPlaceDto : CreatePlaceDto
  
   private debounceTimer?: NodeJS.Timeout;
   public selectedId: string = '';
   
   

  
   

  constructor(
    private mapaService: MapService,
    private router : Router,
    private placesService: PlacesService
  ) {
      this.createPlaceDto = new CreatePlaceDto();
  }

  // Este metodo inicializa el mapa 
  ngOnInit(): void {
    this.mapaService.crearMapa();
    this.mapaService.agregarMarcador().subscribe((marcador) => {
      this.createPlaceDto.location.lat = marcador.lat;
      this.createPlaceDto.location.lng = marcador.lng;
    });
  }

  extactId(idMap : string) {
    const arrayId = idMap.split('.')
    return arrayId[1]
  }

  // Este metodo realiza la busqueda de acuerdo a los parametros del search
  onQueryChanged(query: string = '') {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    
    if (query.length === 0) {
      this.mapaService.removeRouteLayerAndSource();
      this.mapaService.removeMarkers();
    }

    this.debounceTimer = setTimeout(() => {

      this.placesService.getPlacesByQuery(query);
      this.mapaService.removeRouteLayerAndSource();
    }, 500);
  }

  flyTo(place: Feature) {

    this.selectedId  = place.id;
    
    const [lng, lat] = place.center;

    this.mapaService.flyTo([lng, lat]);
  }

  get places(): Feature[] {
    return this.placesService.places;
  }

  get isLoadingPlaces(): boolean {
    return this.placesService.isLoadPlaces;
  }
  scrollPlaces(direction: number): void {
    const container = document.querySelector('.places-container');
    if (container) {
      const scrollAmount = direction * 200; // Ajusta el valor según sea necesario
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  }
  navegar(lugarId: string) {

    let id = this.extactId(lugarId)
    console.log(id);
    this.router.navigate([`detail/${id}`]).then(() => {
      window.location.reload();
    });
  }

}
