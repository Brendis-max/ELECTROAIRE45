import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RescontraPageRoutingModule } from './rescontra-routing.module';

import { RescontraPage } from './rescontra.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RescontraPageRoutingModule
  ],
  declarations: [RescontraPage]
})
export class RescontraPageModule {}
