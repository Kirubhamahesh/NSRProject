
import { Routes, RouterModule, Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { EditProductComponent } from './backendComponents/edit-product/edit-product.component';
import { DisplayListComponent } from './backendComponents/display-list/display-list.component';
import { AdminHomepageComponent } from './backendComponents/admin-homepage/admin-homepage.component';


const appRoutes: Routes = [
  { path: '',component:AdminHomepageComponent },
  { path: 'update/:id/:type',component:EditProductComponent },
 { path: 'gotoproduct',component:DisplayListComponent }
  // { path: 'home', redirectTo: 'carousel', pathMatch:'full' },
  // { path: 'carousel',component:CarouselComponent },
  //  { path: 'datalist/:type',component:DataListComponent },
  //  { path: 'datalist/kids',component:DataListComponent },
  //  { path: 'orderdetail',component:OrderinstructionComponent },
  //  { path: 'footer',component:FooterComponent },
  // { path: 'datadetail/:id/:type',component:DataDetailComponent },
  // { path: 'new',component:DataDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
