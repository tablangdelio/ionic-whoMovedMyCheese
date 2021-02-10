import { Component, OnInit } from '@angular/core';

import { SearchService } from '../services/search.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
    book_Data: any =[];
    searchRes: any;
    textHighlight: string
  constructor(private searchService:  SearchService) {}

  async ngOnInit() {
      await this.loadSearchData();   
  }
  
    async loadSearchData(): Promise<any>{
      await this.searchService.getSearchData().subscribe(data =>{
          this.book_Data = data;

        console.log(this.book_Data)  
      
      });
    }
_ionchange(event){

       const val = event.target.value;
       this.textHighlight = val;
       if(val && val.trim() != ''){
           this.searchRes = this.book_Data.filter(itemFilter => {
              return itemFilter.read.toLowerCase().indexOf(val.toLowerCase()) > -1
           });
      // this.searchRes.forEach(text => 
        //  this.searchRes = text.read.replace(new RegExp('('+val+')','gi'), '<span class="text-highlights">'+ val+'</span>')
      //  );
       console.log(this.searchRes)
       }   // if check for empty val
  }
searchTextHighlight(text, val =this.textHighlight){
    return text.replace(new RegExp('('+val+')','gi'), '<mark class="text-highlights">'+ val+'</mark>')
  }
    //object is Empty
isEmptyResult(obj){
    return (obj && (Object.keys(obj).length === 0));
  }

 
}
