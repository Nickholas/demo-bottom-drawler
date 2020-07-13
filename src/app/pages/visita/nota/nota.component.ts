import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter, Input } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-nota',
  templateUrl: './nota.component.html',
  styleUrls: ['./nota.component.scss']
})
export class NotaComponent implements OnInit {

  @Output() close = new EventEmitter();

  form: FormGroup;
  update = false;
  public tipoIncidencia = [
      {tipoincidenciaid: 1, descripcion: 'Plaga'},
      {tipoincidenciaid: 2, descripcion: 'Enfermedad'},
      {tipoincidenciaid: 3, descripcion: 'Otro'}
  ];
  public gravedad = [
    {nivelgravedadid: 1, descripcion: 'Leve'},
    {nivelgravedadid: 2, descripcion: 'Moderada'},
    {nivelgravedadid: 3, descripcion: 'Grave'}
];

  constructor(
    private camera: Camera,
    private cd: ChangeDetectorRef,
    public actionSheetController: ActionSheetController,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      tipoincidenciaid: ['', Validators.required],
      nivelgravedadid: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha: [new Date().toISOString(), Validators.required],
      imagenes: [[], ''],
      posicion: ['', '']
    });
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Cargar desde la galería',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Usar cámara',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancelar',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }

  pickImage(sourceType) {
    const options: CameraOptions = {
      quality: 50,
      sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    };

    this.camera.getPicture(options).then((imageData) => {
      this.form.get('imagenes').value.push('data:image/jpeg;base64,' + imageData);
      this.cd.detectChanges();
    }, (err) => {
      console.error(err);
    });
  }

  deletePhoto(index) {
    this.form.get('imagenes').value.splice(index, 1);
  }

  onClose() {
    this.close.emit(false);
    this.buildForm();
  }

  onSave() {
    this.close.emit({ key: 'nota', value: this.form.value, update: this.update });
    this.buildForm();
  }
}
