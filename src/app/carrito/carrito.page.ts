import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

interface CartItem {
  name: string;
  brand: string;
  price: number;
  quantity: number;
  image: string;
  selected: boolean;
}

@Component({
  selector: 'app-carrito',
  templateUrl: 'carrito.page.html',
  styleUrls: ['carrito.page.scss'],
  standalone: false,
})
export class CarritoPage implements OnInit, AfterViewInit {
  cartItems: CartItem[] = [];
  isDarkMode: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart).map((item: any) => ({
        ...item,
        selected: item.selected !== undefined ? item.selected : false
      }));
    }
  }

  ngAfterViewInit(): void {
    // Detectar modo oscuro/claro
    this.isDarkMode = document.body.classList.contains('dark');
    this.renderPayPalButton();

    // Escuchar cambios de modo en tiempo real (opcional)
    const observer = new MutationObserver(() => {
      const currentMode = document.body.classList.contains('dark');
      if (currentMode !== this.isDarkMode) {
        this.isDarkMode = currentMode;
        this.renderPayPalButton(); // Volver a renderizar si cambia
      }
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  }

  removeFromCart(item: CartItem): void {
    const index = this.cartItems.indexOf(item);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }
    this.updateTotal();
    setTimeout(() => this.renderPayPalButton(), 0);
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getSelectedTotal(): number {
    return this.cartItems.reduce((total, item) =>
      total + (item.selected ? item.price * item.quantity : 0), 0
    );
  }

  updateTotal(): void {
    setTimeout(() => this.renderPayPalButton(), 0);
  }

  renderPayPalButton(): void {
    const selectedItems = this.cartItems.filter(item => item.selected);
    const total = this.getSelectedTotal().toFixed(2);
    const container = document.getElementById('paypal-button-container');
    if (!container) return;

    container.innerHTML = '';
    if (selectedItems.length === 0) return;

    // @ts-ignore
    paypal.Buttons({
      style: {
        layout: 'vertical',
        color: this.isDarkMode ? 'white' : 'gold',
        shape: 'rect',
        label: 'paypal'
      },
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: total
            },
            description: 'Compra de productos del carrito'
          }]
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          alert(`Pago completado por ${details.payer.name.given_name}. ¡Gracias!`);
          this.cartItems = [];
          localStorage.removeItem('cartItems');
          this.router.navigate(['/tabs/tab3']);
        });
      },
      onError: (err: any) => {
        console.error('Error en PayPal:', err);
        alert('Ocurrió un error al procesar el pago.');
      }
    }).render('#paypal-button-container');
  }

  checkout(): void {
    const selectedItems = this.cartItems.filter(item => item.selected);
    console.log('Ítems seleccionados para pago:', selectedItems);
    this.router.navigate(['/']);
  }

  regresar(): void {
    this.router.navigate(['/tabs/tab2']);
  }
}
