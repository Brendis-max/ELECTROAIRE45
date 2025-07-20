import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})

export class Tab1Page {

  
  constructor() {}
  
  promociones = [
    {
      nombre: 'Aire acondicionado Mirage',
      precio: '$6,000.00',
      descripcion: 'Instalación incluida. 12,000 Btus convencional a 110 V',
      imagen: 'assets/promo1.jpg',
      contacto: '2712535163'
    },
    {
      nombre: 'Equipo mca. PRIME',
      precio: '$4,900.00',
      descripcion: '12,000 Btus a 110 V. No incluye instalación. Pago contra entrega.',
      imagen: 'assets/promo2.jpg',
      contacto: '2712535163'
    }
  ];

  servicios = [
    {
      nombre: 'Aire Acondicionado',
      descripcion: 'Instalación de aires acondicionados.',
      imagen: 'assets/aireacon.jpg'
    },
    {
      nombre: 'Refrigeración',
      descripcion: 'Equipos de alta tecnología para industrias comerciales.',
      imagen: 'assets/regriser.jpg'
    },
    {
      nombre: 'Mantenimiento Preventivo',
      descripcion: 'Servicios de mantenimiento y corrección.',
      imagen: 'assets/mante.jpg'
    }
  ];
}



