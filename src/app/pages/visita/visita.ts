import { ServicioVisita } from './../../services/visita';
import { Component, ChangeDetectorRef } from '@angular/core';
import { LoadingController, ToastController, ModalController } from '@ionic/angular';
import { ServicioComun } from 'src/app/services/comun';

import { DrawerState } from 'ion-bottom-drawer';

@Component({
  selector: 'page-visita',
  templateUrl: 'visita.html',
  styleUrls: ['visita.scss']
})
export class VisitaPage {
  public defaultHref = '';

  public State: DrawerState = DrawerState.Bottom;
  public dockedheight = 300;
  public distancetop = 150;

  tipoModal: number;
  notas = new Array<any>();

  constructor(
    public comun: ServicioComun,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public modalController: ModalController) {
  }

  ionViewWillEnter() {

  }

  onShow(tipoModal: number) {
    this.tipoModal = tipoModal;
    this.State = DrawerState.Docked;
  }

  onClose(ev) {
    // Necesario para que vuelva a su poiscion 'original'
    this.dockedheight = 300;
    setTimeout(() => {
                this.dockedheight = 300;
                this.State = DrawerState.Bottom;
              }, 500);
    this.distancetop = 150;
  }
}
