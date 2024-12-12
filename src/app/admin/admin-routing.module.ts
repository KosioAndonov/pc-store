import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewComponent } from './add-new/add-new.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';


const routes: Routes = [
    {
        path: 'add-new',
        component: AddNewComponent,

    },
    {
        path: 'view-orders',
        component: ViewOrdersComponent,

    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {

}