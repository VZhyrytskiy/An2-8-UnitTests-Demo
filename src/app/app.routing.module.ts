import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProductListComponent, ProductDetailsComponent, PageNotFoundComponent, AboutComponent } from './components';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: 'products', pathMatch: 'full'},
      { path: 'products', component: ProductListComponent },
      { path: 'product/:id', component: ProductDetailsComponent },
      { path: 'about', component: AboutComponent },
      { path: '**', component: PageNotFoundComponent }
    ])
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { };

