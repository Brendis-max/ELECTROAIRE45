import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisCitasPage } from './miscitas.page'; // ✅ Corregimos la importación

const routes: Routes = [
  {
    path: '',
    component: MisCitasPage  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiscitasPageRoutingModule {}
