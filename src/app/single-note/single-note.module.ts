import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleNotePageRoutingModule } from './single-note-routing.module';

import { SingleNotePage } from './single-note.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingleNotePageRoutingModule
  ],
  declarations: [SingleNotePage]
})
export class SingleNotePageModule {}
