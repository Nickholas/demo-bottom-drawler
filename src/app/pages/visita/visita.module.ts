import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/jwt-authorization';

import { VisitaPage } from './visita';
import { VisitaPageRoutingModule } from './visita-routing.module';
import { IonBottomDrawerModule } from 'ion-bottom-drawer';
import { NotaComponent } from './nota/nota.component';
import { PlagaComponent } from './plaga/plaga.component';
import { LaborComponent } from './labor/labor.component';
import { AbonoComponent } from './abono/abono.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    VisitaPageRoutingModule,
    IonBottomDrawerModule
  ],
  declarations: [
    VisitaPage,
    NotaComponent,
    PlagaComponent,
    LaborComponent,
    AbonoComponent
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }]
})
export class VisitaPageModule { }
