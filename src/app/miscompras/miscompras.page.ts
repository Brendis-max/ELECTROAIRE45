import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-miscompras',
  templateUrl: './miscompras.page.html',
  styleUrls: ['./miscompras.page.scss'],
  standalone: false,
})
export class MiscomprasPage implements OnInit {
  compras: any[] = [];
  
  constructor() { }

  

  ngOnInit() {
    this.compras = JSON.parse(localStorage.getItem('compras') || '[]');
  }
}
