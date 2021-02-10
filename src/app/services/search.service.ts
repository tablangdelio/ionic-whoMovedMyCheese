import { Injectable, RendererFactory2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  
  constructor( private httpClient: HttpClient) { }

  getSearchData(){
    return this.httpClient.get("assets/books.json").pipe(
      map((res:any) =>
        res.map((data => {
          return {
            read: data.r,
           
          }

        })

        )
       
      )

    ) 
  }
 

}
