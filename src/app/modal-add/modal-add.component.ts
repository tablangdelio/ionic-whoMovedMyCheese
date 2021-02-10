import { Component } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-add',
  templateUrl: './modal-add.component.html',
  styleUrls: ['./modal-add.component.scss'],
})
export class ModalAddComponent {
     noteInput = new FormControl('', Validators.required);
 
  constructor(
            private modalCtrl: ModalController,  
  ) {}

  dismissModal(){
    this.modalCtrl.dismiss({
      dismiss: true
    });
  }

  onSubmit(){
      this.modalCtrl.dismiss(this.noteInput.value, 'addNote');
  }
   


}
