
import { Routes, RouterModule, Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { EditProductComponent } from './backendComponents/edit-product/edit-product.component';
import { DisplayListComponent } from './backendComponents/display-list/display-list.component';
import { AdminHomepageComponent } from './backendComponents/admin-homepage/admin-homepage.component';
import { MyordersComponent } from './frontendComponenets/myorders/myorders.component';
import { MainComponent } from './frontendComponenets/main/main.component';
import { DataListComponent } from './frontendComponenets/data-list/data-list.component';
import { ProductDetailComponent } from './frontendComponenets/product-detail/product-detail.component';
import { RegisterUserComponent } from './frontendComponenets/register-user/register-user.component';
import { CustomerListComponent } from './backendComponents/customer-list/customer-list.component';
import { CustomerOrderListComponent } from './backendComponents/customer-order-list/customer-order-list.component';


const appRoutes: Routes = [
   { path: '',component:ProductDetailComponent },
      // { path: '',component:AdminHomepageComponent },
  { path: 'prodlist',component:DisplayListComponent },
  { path: 'update',component:EditProductComponent },
  { path: 'order',component:MyordersComponent },
  { path: 'additem',component:EditProductComponent },
  { path: 'viewAllOrders',component:MyordersComponent },
  { path: 'gotoproduct',component:ProductDetailComponent },
  { path: 'registeruser',component:RegisterUserComponent },
  { path: 'view-user',component:CustomerListComponent },
  { path: 'view-order',component:CustomerOrderListComponent },
  // { path: 'home', redirectTo: 'carousel', pathMatch:'full' },
]
 

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
