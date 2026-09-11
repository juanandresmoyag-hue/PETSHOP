import { Component } from '@angular/core';

@Component({
  selector: 'app-mascotas',
  standalone: true,
  imports: [],
  templateUrl: './mascotas.component.html',
  styleUrl: './mascotas.component.css'
})
export class MascotasComponent {
  
  posicionActual = 0;
  slideAncho = 810; // Este valor debe coincidir aproximadamente con el ancho en px del carousel-window
  totalSlides = 3;  // Total de mascotas que tienes en el carrusel
  indiceActual = 0;

  avanzar() {
    if (this.indiceActual < this.totalSlides - 1) {
      this.indiceActual++;
      this.posicionActual = -(this.indiceActual * this.slideAncho);
    } else {
      // Si llega al final, regresa al principio
      this.indiceActual = 0;
      this.posicionActual = 0;
    }
  }

  retroceder() {
    if (this.indiceActual > 0) {
      this.indiceActual--;
      this.posicionActual = -(this.indiceActual * this.slideAncho);
    } else {
      // Si está en el principio y va hacia atrás, salta al último
      this.indiceActual = this.totalSlides - 1;
      this.posicionActual = -(this.indiceActual * this.slideAncho);
    }
  }
}
