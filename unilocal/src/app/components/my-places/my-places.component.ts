import { Component, Input, Output } from '@angular/core';
import { Lugar } from '../../class/models/lugar';
import { LocalService } from '../../services/local.service';
import { TokenService } from '../../services/token.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-places',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-places.component.html',
  styleUrl: './my-places.component.css'
})
export class MyPlacesComponent {
  @Input() lugar!: any
  currentImageIndex: number = 0;
  intervalId: any;

  constructor(private localService: LocalService,
    private tokenService: TokenService
  ){}

  ngOnInit() {
    this.startImageCarousel();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  startImageCarousel(): void {
    this.intervalId = setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.lugar.listaImagenes.length;
    }, 4500); // Cambia la imagen cada 4.5 segundos
  }

}
