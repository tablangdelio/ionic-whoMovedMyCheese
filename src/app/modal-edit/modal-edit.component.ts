import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators} from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { notEqual } from 'assert';


@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.scss'],
})
export class ModalEditComponent implements OnInit{
  @Input() id: number;
  @Input() note: string;

  noteEditInput = new FormControl('', Validators.required);
 
  constructor(
       private modalCtrl: ModalController,  
    ) {}
    ngOnInit() {
        this.noteEditInput.setValue({value:this.note})
    }
      
    dismissModal(){
      this.modalCtrl.dismiss({
        dismiss: true
      });
    }
  
    onSubmit(){
        this.modalCtrl.dismiss(this.noteEditInput.value, 'editNote');
    }
     

}
