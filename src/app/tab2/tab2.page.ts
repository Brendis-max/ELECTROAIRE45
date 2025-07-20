import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

declare var paypal: any;
//prueba cambio
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page implements AfterViewInit {
  catalogItems = [
    {
      id: 1,
      name: 'Mini Split Solo Frío 12,000 BTU\'s 1 Ton',
      brand: 'York',
      description: 'Efficient cooling with standard shipping and up to 12 months without interest.',
      price: 1,
      image: 'assets/lg.jpeg',
    },
    {
      id: 2,
      name: 'Mini Split Inverter Solo Frío 12,000 BTU\'s 1 Ton',
      brand: 'Samsung',
      description: 'Advanced inverter technology with standard shipping and up to 12 months without interest.',
      price: 1,
      image: 'assets/sam.jpeg',
      rating: 1,
    },
  ];

  cartItems: any[] = [];
  searchTerm: string = '';
  filteredItems: any[] = [...this.catalogItems];

  constructor(private router: Router, private loadingCtrl: LoadingController) {}

  ngAfterViewInit() {
    setTimeout(() => this.renderPayPalButtons(), 500);
  }

  renderPayPalButtons() {
    this.filteredItems.forEach(item => {
      const containerId = 'paypal-button-container-' + item.id;
      const container = document.getElementById(containerId);

      if (container && container.childElementCount === 0) {
        paypal.Buttons({
          style: {
            layout: 'horizontal',
            color: 'blue',
            shape: 'pill',
            label: 'paypal',
            height: 40
          },
          createOrder: async (data: any, actions: any) => {
            const loading = await this.loadingCtrl.create({
              message: 'Redirigiendo a PayPal...',
              spinner: 'crescent',
              duration: 2000
            });
            await loading.present();

            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: item.price.toFixed(2),
                },
                description: item.name,
              }],
            });
          },
          onApprove: (data: any, actions: any) => {
            return actions.order.capture().then((details: any) => {
              console.log('Pago aprobado:', details);
              this.registrarCompra(item);
              this.router.navigate(['/miscompras']);
            });
          },
          onError: (err: any) => {
            console.error('Error en el pago:', err);
          }
        }).render('#' + containerId);
      }
    });
  }

  registrarCompra(item: any) {
    let compras = JSON.parse(localStorage.getItem('compras') || '[]');
    compras.push(item);
    localStorage.setItem('compras', JSON.stringify(compras));
    console.log('Compra registrada:', item);
  }

  filterItems() {
    this.filteredItems = this.catalogItems.filter(item =>
      item.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      item.brand.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    // <- importante volver a renderizar botones
    setTimeout(() => this.renderPayPalButtons(), 500);
  }

  addToCart(item: any) {
    const existingItem = this.cartItems.find(cartItem => cartItem.name === item.name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({ ...item, quantity: 1 });
    }
    console.log('Agregar al carrito:', item);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  goToCart() {
    this.router.navigate(['/carrito']);
  }

  getCartCount(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }
}
