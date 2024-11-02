import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComputersComponent } from './computers/computers.component';
import { PartsComponent } from './parts/parts.component';
import { AboutComponent } from './about/about.component';
import { ErrorComponent } from './core/error/error.component';
import { NotFoundComponent } from './not-found/not-found.component';

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
  },{
    path: 'about',
    component: AboutComponent,
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
