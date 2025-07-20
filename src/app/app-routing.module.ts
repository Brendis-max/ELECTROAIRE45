import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'rescontra',
    loadChildren: () => import('./rescontra/rescontra.module').then( m => m.RescontraPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./carrito/carrito.module').then( m => m.CarritoPageModule)
  },
  {
    path: 'cita',
    loadChildren: () => import('./cita/cita.module').then( m => m.CitaPageModule)
  },
  {
    path: 'miscitas',
    loadChildren: () => import('./miscitas/miscitas.module').then( m => m.MiscitasPageModule)
  },
  {
    path: 'miscompras',
    loadChildren: () => import('./miscompras/miscompras.module').then( m => m.MiscomprasPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
