import { Component, OnInit, Input } from '@angular/core';
import { ModalEditComponent } from '../modal-edit/modal-edit.component';
import { AlertController, ModalController, ToastController, PopoverController} from '@ionic/angular';
@Component({
  selector: 'app-popover-component',
  templateUrl: './popover-component.component.html',
  styleUrls: ['./popover-component.component.scss'],
})
export class PopoverComponentComponent implements OnInit {
  @Input() id: number;
  @Input() note: string;

  constructor( private modalCtrl: ModalController, private popOverCtrl: PopoverController) { }

  ngOnInit() {
    console.log(this.id);
  }
  onDelete(){
    this.popOverCtrl.dismiss(null, 'delete')
  }
  onEdit(){
    this.popOverCtrl.dismiss(null, 'edit')
  }

}
