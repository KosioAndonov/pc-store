import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from '../user/user-routing.module';
import { AddNewComponent } from './add-new/add-new.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';
import { AdminRoutingModule } from './admin-routing.module';



@NgModule({
  declarations: [
    AddNewComponent,
    ViewOrdersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
  ]
})
export class AdminModule { }
