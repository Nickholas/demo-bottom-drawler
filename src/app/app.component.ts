import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, Platform, ToastController, Events } from '@ionic/angular';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Network } from '@ionic-native/network/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import { Subscription } from 'rxjs';
import { ServicioComun } from './services/comun';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
    public loggedIn = false;
    public dark = false;
    public currentLogo: string;
    public currentUsuario: string;
    public appversion: string;
    private connected: Subscription;
    private disconnected: Subscription;

    constructor(
        private menu: MenuController,
        private platform: Platform,
        private router: Router,
        private splashScreen: SplashScreen,
        public toastCtrl: ToastController,
        private statusBar: StatusBar,
        private events: Events,
        private appVersion: AppVersion,
        private network: Network,
        public comunService: ServicioComun,
    ) {
        this.initializeApp();
    }

    async ngOnInit() {
        this.listenForLoginEvents();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.appVersion.getVersionNumber().then(
                (versionNumber) => {
                    this.appversion = versionNumber;
                },
                (error) => {
                    console.log(error);
                });
            this.listenForNetworkConnection();
            this.splashScreen.hide();
        });
    }

    ionViewWillLeave() {
        this.connected.unsubscribe();
        this.disconnected.unsubscribe();
    }

    listenForLoginEvents() {
        this.events.subscribe('login:singin', (data) => {
            if (data.logged) {
                this.loggedIn = true;
                this.currentLogo = localStorage.getItem('UserData');
                this.currentUsuario = localStorage.getItem('UserName');
                const currentTheme = localStorage.getItem('DarkTheme');
                if (currentTheme) {
                    if (currentTheme === 'true') {
                        this.dark = true;
                    } else {
                        this.dark = false;
                    }
                } else {
                    localStorage.setItem('DarkTheme', 'false');
                    this.dark = false;
                }
            } else {
                this.logout();
            }
        });
    }

    listenForNetworkConnection() {
        // Watch for a connection
        this.connected = this.network.onConnect().subscribe(() => {
            this.comunService.networkConnected = true;
        });

        // Watch for disconnecting a network
        this.disconnected = this.network.onDisconnect().subscribe(() => {
            this.comunService.networkConnected = false;

            this.toastCtrl.create({
                message: 'No hay conexión a internet',
                duration: 1000
              }).then(alertError => alertError.present());
            // this.logout();
        });
    }

    onChangeTheme($event) {
        if (this.dark) {
            localStorage.setItem('DarkTheme', 'true');
        } else {
            localStorage.setItem('DarkTheme', 'false');
        }
    }

    logout() {

        // Eliminamos el token actual para que se tenga que volver a registrar
        localStorage.removeItem('AccessToken');

        // Regresamos a la pantalla de login
        this.router.navigate(['/']);
    }
}
