import { Component,  Input} from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-modal-view',
  templateUrl: './modal-view.component.html',
  styleUrls: ['./modal-view.component.scss'],
})
export class ModalViewComponent  {
  @Input() id: number;
  @Input() note: string;
  @Input() date: string;
  constructor(private modalCtrl: ModalController) { }

  dismissModal(){
    this.modalCtrl.dismiss({
      dismiss: true
    })
  }

}
