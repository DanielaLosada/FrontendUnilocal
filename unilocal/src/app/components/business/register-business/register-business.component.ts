import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapService } from '../../../services/map.service';
import { CreatePlaceDto } from '../../../class/dto/create-place-dto';
import { CommonModule } from '@angular/common';
import { TokenService } from '../../../services/token.service';
import { PublicService } from '../../../services/public.service';
import { Tipo } from '../../../class/models/tipo';
import { Horario } from '../../../class/models/horario';
import { LocalService } from '../../../services/local.service';



@Component({
  selector: 'app-register-business',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register-business.component.html',
  styleUrl: './register-business.component.css'
})
export class RegisterBusinessComponent {

  @Output() close = new EventEmitter<void>();
  showLocation: boolean = false;
  createPlaceDto: CreatePlaceDto
  horarios: Horario[];
  tipos: string[];
   phones: { telefono: string }[] = [{ telefono: '' }];
  

  closePopup() {
    this.close.emit();
  }

  constructor(private mapaService: MapService,
    private localService: LocalService,
    private tokenService: TokenService,
    private publicService: PublicService) {
    
    this.createPlaceDto = new CreatePlaceDto();
    this.horarios = [new Horario()];
    this.tipos = [];
    this.cargarTipos();
  }

  ngOnInit(): void {
    this.mapaService.crearMapa();
    this.mapaService.agregarMarcador().subscribe((marcador) => {
      this.createPlaceDto.ubicacion.latitud = marcador.lat;
      this.createPlaceDto.ubicacion.longitud = marcador.lng;
    });
  }

  public crearNegocio() {
    const idUser = this.tokenService.getCodigo();
    this.createPlaceDto.listHorarios = this.horarios;
    this.createPlaceDto.listTelefonos = this.phones;
    this.createPlaceDto.codigoCliente = idUser;
    this.createPlaceDto.direccion = idUser;
    this.localService.crearLugar(this.createPlaceDto);
  }

  public agregarHorario() {
    this.horarios.push(new Horario());
  }

  eliminarHorario(index: number): void {
    this.horarios.splice(index, 1);
  }

  agregarTelefono(): void {
    this.phones.push({ telefono: '' });
  }

  eliminarTelefono(index: number): void {
    this.phones.splice(index, 1);
  }

  public onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const files = event.target.files;
      this.createPlaceDto.listImagenes = files;
    }
  }

  private cargarTipos() {
    // this.publicService.listarTiposNegocio().then((response) => {
    //   // Iterar sobre cada objeto Tipo en response.data
    //   this.tipos = response.data.map((tipo: Tipo) => tipo.tipo);
    // })
    // .catch((error) => {
    //   console.log("Error al obtener los tipos")
    // })
    this.tipos = ["PANADERIA", "OTROS"];
  }
  

}
