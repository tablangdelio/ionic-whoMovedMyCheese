import { Component, OnInit, Renderer2 } from '@angular/core';
import {BookContentsService } from '../services/book-contents.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  Books_data: any = [];
  filterTerm: string;
  searchOn: boolean = false;
  darkMode: boolean;
  fontSize: number;
  constructor(
           
              private renderer: Renderer2,
              private bookService: BookContentsService,
              ) {}
  ngOnInit(){
            this.loadBook();
      }
  fontSizeMeter(event){
    const size = event.detail.value
    this.fontSize = size
  }
  loadBook(){
      this.bookService.getBook().subscribe( data =>{
      console.log(data);
      this.Books_data = data; 
    });
  }
  darkModeSwitch(darkMode){
    if(darkMode){
        return this.renderer.setAttribute(document.body,"color-theme","dark");
     }
     return this.renderer.setAttribute(document.body,"color-theme","light");  
    }
}
