import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { ErrorComponent } from '../core/error/error.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';


const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
       
      },
      {
        path: 'register',
        component: RegisterComponent,
        
      },
      {
        path: 'profile',
        component: ProfileComponent,
        
      },
      {
        path: 'shopping-cart',
        component: ShoppingCartComponent,
        
      },
      { path: 'error', component: ErrorComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { 
  
}
