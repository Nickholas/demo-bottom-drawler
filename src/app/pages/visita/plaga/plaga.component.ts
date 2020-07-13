import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-plaga',
  templateUrl: './plaga.component.html',
  styleUrls: ['./plaga.component.scss']
})
export class PlagaComponent implements OnInit {
  @Output() close = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onPlagaClose() {
    this.close.emit(true);
  }

}
