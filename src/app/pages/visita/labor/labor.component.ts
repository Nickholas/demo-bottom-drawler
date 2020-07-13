import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-labor',
  templateUrl: './labor.component.html',
  styleUrls: ['./labor.component.scss']
})
export class LaborComponent implements OnInit {
  @Output() close = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onLaborClose() {
    this.close.emit(true);
  }

}
