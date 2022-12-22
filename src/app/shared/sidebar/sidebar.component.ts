import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private gifsServices:GifsService){}

  get gifsSearch(){
    return this.gifsServices.historial;
  }

  search(term:string){
    this.gifsServices.searchGifs(term);
  }
}
