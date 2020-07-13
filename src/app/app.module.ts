import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { RouteReuseStrategy } from '@angular/router';

// MIS INTERCEPTORES
import { TokenInterceptor } from './jwt-authorization';

// PLUGINS INSTALADOS
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Network } from '@ionic-native/network/ngx';
import { IonBottomDrawerModule } from 'ion-bottom-drawer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServicioComun } from './services/comun';

import localeeS from '@angular/common/locales/es-Ar';
import { registerLocaleData } from '@angular/common';
import { Camera } from '@ionic-native/camera/ngx';

registerLocaleData(localeeS, 'es-Ar');

const pages: any = [
  AppComponent
];

@NgModule({
  declarations: pages,
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IonBottomDrawerModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ServicioComun,
    AppVersion,
    AndroidPermissions,
    Geolocation,
    LocationAccuracy,
    Network,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LOCALE_ID, useValue: 'es-Ar' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
