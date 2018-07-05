import { Component, OnInit, VERSION } from '@angular/core';
import { MovieDBService } from './services/movie-db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = `The Movie Database (TMDb)`;
  genresList: any;

  constructor(public DBService: MovieDBService) {}

  ngOnInit() {}
}
