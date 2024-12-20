import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComputersComponent } from './computers/computers.component';
import { PartsComponent } from './parts/parts.component';
import { AboutComponent } from './about/about.component';
import { ErrorComponent } from './core/error/error.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ShoppingCartComponent } from './user/shopping-cart/shopping-cart.component';
import { DetailsComponent } from './details/details.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/computers',
    
  },
  {
    path: 'computers',
    component: ComputersComponent,
  },
  {
    path: 'parts',
    component: PartsComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  }, 
  {
    path: 'my-orders',
    component: MyOrdersComponent,
     canActivate: [AuthGuard]
  },{
    path: 'shopping-cart',
    component: ShoppingCartComponent,
    canActivate: [AuthGuard]
  },{
    path: 'details/:id',
    component: DetailsComponent,
  },
  {
    path: 'auth',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
  },
  { path: 'error', component: ErrorComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
