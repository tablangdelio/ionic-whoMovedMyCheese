import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingleNotePage } from './single-note.page';

const routes: Routes = [
  {
    path: '',
    component: SingleNotePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleNotePageRoutingModule {}
