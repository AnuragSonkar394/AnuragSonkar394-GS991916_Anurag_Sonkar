import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() showModal: boolean = false;  // To control modal visibility
  @Output() closeModal = new EventEmitter<void>();  // Event emitter to notify parent when the modal is closed

  ngOnInit(){
    console.log("here", this.showModal);
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['showModal']) {
      console.log("showModal changed:", this.showModal);
    }
  }
  close() {
    this.closeModal.emit();
  }
}
