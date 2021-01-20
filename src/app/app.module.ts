import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Dataservice } from './data-service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditProductComponent } from './backendComponents/edit-product/edit-product.component';
import { DisplayListComponent } from './backendComponents/display-list/display-list.component';
import { DataDetailComponent } from './frontendComponenets/data-detail/data-detail.component';
import { DataListComponent } from './frontendComponenets/data-list/data-list.component';
import { HeaderComponent } from './frontendComponenets/header/header.component';
import { OrderinstructionComponent } from './frontendComponenets/orderinstruction/orderinstruction.component';
import { CarouselComponent } from './frontendComponenets/carousel/carousel.component';
import { RegisterUserComponent } from './frontendComponenets/register-user/register-user.component';
import { FilterComponent } from './frontendComponenets/filter/filter.component';
import { MainComponent } from './frontendComponenets/main/main.component';
import { AdminHomepageComponent } from './backendComponents/admin-homepage/admin-homepage.component';

@NgModule({
  declarations: [
    AppComponent,
    DataDetailComponent,
    DataListComponent,
    AppComponent,
    HeaderComponent,
    OrderinstructionComponent,
    CarouselComponent,
    RegisterUserComponent,
    FilterComponent,
    MainComponent,
    DisplayListComponent,
    EditProductComponent,
    EditProductComponent,
    AdminHomepageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
    
    
  ],
  exports: [AppRoutingModule],
  providers: [Dataservice],
  bootstrap: [AppComponent]
})
export class AppModule { }
