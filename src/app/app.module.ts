import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { ComputersComponent } from './computers/computers.component';
import { CoreModule } from './core/core.module';
import { MainComponent } from './main/main.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PartsComponent } from './parts/parts.component';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ComputersComponent,
    MainComponent,
    NotFoundComponent,
    PartsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    UserModule,

  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
