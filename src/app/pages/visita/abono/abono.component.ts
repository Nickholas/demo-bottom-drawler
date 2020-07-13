import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-abono',
  templateUrl: './abono.component.html',
  styleUrls: ['./abono.component.scss']
})
export class AbonoComponent implements OnInit {
  @Output() close = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onAbonoClose() {
    this.close.emit(true);
  }

}
