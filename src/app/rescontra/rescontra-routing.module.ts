import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RescontraPage } from './rescontra.page';

const routes: Routes = [
  {
    path: '',
    component: RescontraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RescontraPageRoutingModule {}
