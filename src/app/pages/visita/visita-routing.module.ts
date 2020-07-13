import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisitaPage } from './visita';

const routes: Routes = [
    {
        path: '',
        component: VisitaPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VisitaPageRoutingModule { }
