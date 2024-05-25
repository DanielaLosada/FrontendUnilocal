import { Component ,OnInit} from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { Negocio } from '../../class/dto/negocio';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  
  places : [] = []
  constructor( private placesService: PlacesService){}
  ngOnInit(): void {
    this.getPlaces(); // Llamar a getPlaces al inicializar el componente
  }

async  getPlaces (){
  try {
    await this.placesService.getAllPlacesActives().then((response)=>{
      this.places = response.data.map((place:Negocio)=>{place})
    });
    
  } catch (error) {
    console.error('Error fetching places:', error);
  }
}
  
}
  


