import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { ComputersComponent } from './computers/computers.component';
import { CoreModule } from './core/core.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { PartsComponent } from './parts/parts.component';
import { UserModule } from './user/user.module';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';
import { SharedModule } from './shared/shared.module';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ShoppingCartComponent } from './user/shopping-cart/shopping-cart.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { AdminModule } from './admin/admin.module';
import { ApiService } from './api.service';
import { initializeApp } from 'firebase/app';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ComputersComponent,
    NotFoundComponent,
    PartsComponent,
    MyOrdersComponent,
    ShoppingCartComponent,
    AuthenticateComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    UserModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    SharedModule,
    AdminModule,
    ReactiveFormsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    // Initialize Firebase

  }

 }
