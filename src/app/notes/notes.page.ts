import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { NotesService } from '../services/notes.service';
import { ModalAddComponent } from '../modal-add/modal-add.component';
import { ModalEditComponent } from '../modal-edit/modal-edit.component';
import { ModalViewComponent } from '../modal-view/modal-view.component';
import { PopoverController } from '@ionic/angular';
import { PopoverComponentComponent } from '../popover-component/popover-component.component';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit  {
  @ViewChild('ionItem') ionItem: ElementRef


  Data: any = [];
  searchRes:any[];
  todayString : string = new Date().toDateString();
  constructor(
            private db: NotesService,
            public formBuilder: FormBuilder,
            private toast: ToastController,
            private modalCtrl: ModalController,
            private alertController: AlertController,
            public popoverController: PopoverController
            
  ) { }
  ngOnInit() {
      this.loadData()
}
  loadData(){
    return this.db.dbState().subscribe(data =>{
      if(data){
            this.db.fetchNotes().subscribe(res =>{
            this.Data = res;
                console.log('wee',this.Data);         
          })
      } 
    });
  }
  isEmptyNote(obj=this.Data){
  return (obj && (Object.keys(obj).length === 0));
}
  // pres
  onPress(data, ev){
     this.presentPopover(data, ev);
}
  async presentPopover(data,ev:any) {
      const popover = await this.popoverController.create({
        component: PopoverComponentComponent,
        componentProps: {id: data.id, note:data.notes},
        mode: 'ios',
        cssClass: 'my-custom-class',
        event:ev,  
        translucent: true
      });
        await popover.present();
        const { role}  = await popover.onWillDismiss();
        if(role === 'delete' ){
           return await this.deleteAllert(data.id, data.notes);
        }
        if(role === 'edit'){
          this.editModal(data)
        }
}

    async deleteAllert(id,note) {
      const alert = await this.alertController.create({
        cssClass: 'deleteNgel',
        header: 'CONFIRM!',
        message: `Are sure you want to Delete this note? ${note}`,
        buttons: [
          {
              text: "Delete", handler: () => {
                this.db.deleteNote(id).then(async res => {
                  let toast = await this.toast.create({
                    message: "Note Deleted",
                    duration: 2500
                  });
                  toast.present()
                })
              }
            },
              {
                text: "Cancel",
                role: "cancel",
              }
      ]
      });
          await alert.present();
    }
  // modal add
   async addModal(){
      const modal = await this.modalCtrl.create({
        component: ModalAddComponent

      });
        await modal.present();
        const { data: noteInput, role} = await modal.onWillDismiss();
        if(role === "addNote" ){
          this.db.addNotes(noteInput, this.todayString).then(async res =>{
            let toast = await this.toast.create({
           message: "Note Successfully Added! ",
              duration: 2500
          });
          await toast.present()
        });
        }
   }
   //modal edit
   async editModal(data){
     const modal = await this.modalCtrl.create({
        component: ModalEditComponent,
        componentProps: {id: data.id, note:data.notes}
     });
       await modal.present();   
       const { data:note, role} = await modal.onWillDismiss();
          let noteId = data.id;
          let editedNote = note._pendingValue;
          let date = this.todayString;
        if(role === 'editNote'){
         return this.saveEdit(noteId, editedNote, date);
        }
  }
  saveEdit(id,notes,dateCreadted){
    this.db.updateNotes(id,notes,dateCreadted)
    .then( async res => {
      let toast = await this.toast.create({
        message: "Note Successfully Updated! ",
           duration: 2500
       });
       await toast.present()
    })
  }
   //viewnote
   async viewNote(data){
    const modal = await this.modalCtrl.create({
       component: ModalViewComponent,
       componentProps: {id: data.id, note:data.notes, date: data.dateCreated}
    });
      await modal.present();  
  }
}
