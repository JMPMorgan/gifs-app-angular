import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey='mLjj065Az9VaSHZQAJRevX06zJhQcc8F';
  private serviceUrl='https://api.giphy.com/v1/gifs';
  private _history:string[]=[];
  public results:Gif[]=[];

  constructor(private http:HttpClient){
    this._history=JSON.parse(localStorage.getItem('history')!) || [];
    this.results=JSON.parse(localStorage.getItem('results')!) || [];
  }

  get historial(){
    return [...this._history];
  }


  searchGifs(query:string){
    query=query.trim().toLocaleLowerCase();
    if(!this._history.includes(query)){
      this._history.unshift(query);
      this._history=this._history.splice(0,10);
      localStorage.setItem('history',JSON.stringify(this._history));
    }

    const params=new HttpParams()
                  .set('api_key',this.apiKey)
                  .set('limit','10')
                  .set('q',query);

    this.http.get<SearchGifResponse>(`${this.serviceUrl}/search`,{params})
    .subscribe(
      (response)=>{
        this.results=response.data;
        localStorage.setItem('results',JSON.stringify(this.results));
      }
    )
  }
}
