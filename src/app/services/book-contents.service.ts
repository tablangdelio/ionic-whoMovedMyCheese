import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';


export class BookContents{
    title: string;
    subtitle:string;
    read: any[];
}
@Injectable({
  providedIn: 'root'
})
export class BookContentsService{
  books:any= [];
  constructor(private httpClient: HttpClient) {}
  
  getBook(){
     return this.httpClient.get("assets/book.json")
  }

}
