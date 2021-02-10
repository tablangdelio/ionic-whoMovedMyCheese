import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';


export class Notes {
  id: number;
  notes: string;
  dateCreated: string;
}
@Injectable({
  providedIn: 'root'
})
export class NotesService {
   private storage: SQLiteObject;
   noteList = new BehaviorSubject([]);
   private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false)
  constructor(
            private platform: Platform,
            private sqlite: SQLite,
            private sqlitePorter: SQLitePorter,
            private httpClient: HttpClient

  ) { 
    this.platform.ready().then(() => {
      this.sqlite.create({
      
        name: 'cheeseApp_db.db',
        location: 'default'

      })
      .then((db: SQLiteObject) =>{
          this.storage = db,
          this.createTableRenderData()

      })

    });
  } // end construtor

dbState(){
   return this.isDbReady.asObservable();
  }

fetchNotes(): Observable<Notes[]>{
    return this.noteList.asObservable();
  }

createTableRenderData(){
  
      this.httpClient.get(
        'assets/sql.sql', 
        {responseType: 'text'}
      ).subscribe(data => {
        this.sqlitePorter.importSqlToDb(this.storage, data)
          .then(_ => {
            this.getNotes();
            this.isDbReady.next(true);
          })
          .catch(error => console.error(error));
      });
   
  }

  //get notes
   getNotes(){
    return this.storage.executeSql("SELECT * FROM table_notes", []).then(res => {
          let items: Notes[] = [];
          if(res.rows.length > 0){
            for(var i = 0; i < res.rows.length; i++){
              items.push({
                id: res.rows.item(i).id,
                notes: res.rows.item(i).notes,
                dateCreated: res.rows.item(i).dateCreated
              });
            }
         }
         this.noteList.next(items);
    });
  }
  //add notes
  addNotes(note, dateCreated){
    let data = [note, dateCreated]
    return this.storage.executeSql("INSERT INTO table_notes (notes, dateCreated) VALUES(?, ?)", data).then(res =>{
        this.getNotes();
    });
  }
    
  // get single notes
  getSingleNotes(id): Promise<Notes>{
    return this.storage.executeSql("SELECT * FROM table_notes WHERE id = ?", [id]).then(res => {
      return{
         id: res.rows.item(0).id,
         notes: res.rows.item(0).notes,
         dateCreated: res.rows.item(0).dateCreated
      }
    })
  }
  searchNote(searchTerm){
   
      return this.storage.executeSql(`SELECT notes FROM table_notes WHERE LIKE %${searchTerm}%`,[]).then(res => {
        let items: Notes[] = [];
        if(res.rows.length > 0){
          for(var i = 0; i < res.rows.length; i++){
            items.push({
              id: res.rows.item(i).id,
              notes: res.rows.item(i).notes,
              dateCreated: res.rows.item(i).dateCreated
            });
          }
       }
       this.noteList.next(items);
      });
  }
  //update notes
  updateNotes(id, notes, dateCreadted){
    let data = [notes,dateCreadted];
    return this.storage.executeSql(`UPDATE table_notes SET notes = ?, dateCreated = ? WHERE id = ${id}`, data).then( data => {
      this.getNotes();
    });

  }
  //delele notes

  deleteNote(id){
    return this.storage.executeSql("DELETE FROM table_notes WHERE id = ?",[id]).then(_ =>{
      this.getNotes();
    })
  }

}
