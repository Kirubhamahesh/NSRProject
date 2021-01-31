
import { Routes, RouterModule, Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { EditProductComponent } from './backendComponents/edit-product/edit-product.component';
import { DisplayListComponent } from './backendComponents/display-list/display-list.component';
import { AdminHomepageComponent } from './backendComponents/admin-homepage/admin-homepage.component';
import { MyordersComponent } from './frontendComponenets/myorders/myorders.component';
import { MainComponent } from './frontendComponenets/main/main.component';
import { DataListComponent } from './frontendComponenets/data-list/data-list.component';
import { ProductDetailComponent } from './frontendComponenets/product-detail/product-detail.component';


const appRoutes: Routes = [
  { path: '',component:ProductDetailComponent },
  // { path: '',component:AdminHomepageComponent },
  { path: 'update',component:EditProductComponent },
  { path: 'order',component:MyordersComponent },
  { path: 'additem',component:EditProductComponent },
  { path: 'viewAllOrders',component:MyordersComponent },
  { path: 'gotoproduct',component:ProductDetailComponent },
  // { path: 'home', redirectTo: 'carousel', pathMatch:'full' },
]
 

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
