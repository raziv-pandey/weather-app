import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'invoice-item',
  templateUrl: 'invoice-item.html'
})
export class InvoiceItemComponent {

  @Input() invoice;
  @Output() handleCheck = new EventEmitter<any>();
  status;
  constructor() {
  }

  onCheck(){
    
    let checkObj = {
      status : this.status,
      invoice : this.invoice
    };
    this.handleCheck.emit(checkObj);
  }
}
