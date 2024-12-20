import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { ErrorComponent } from '../core/error/error.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AuthGuard } from '../auth.guard';


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
        canActivate: [AuthGuard],
        
      },
      {
        path: 'shopping-cart',
        component: ShoppingCartComponent,
        canActivate: [AuthGuard],
        
      },
      { path: 'error', component: ErrorComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { 
  
}
