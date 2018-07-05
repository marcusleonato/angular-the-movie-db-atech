import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Location } from '@angular/common';
import { MovieDBService } from '../services/movie-db.service';
import { GlobalServicesFuctions } from '../services/global-service.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movieId: string;
  movie: any;
  movieMenu: any;

  constructor(
    private route: ActivatedRoute,
    private dbService: MovieDBService,
    public dialog: MatDialog,
    public domSanitizer: DomSanitizer,
    private titleService: Title,
    public GlobalFunctions: GlobalServicesFuctions,
    private location: Location,
    private router: Router
  ) {
    this.domSanitizer = domSanitizer;
    this.route.params.subscribe(params => {
      this.movieId = params['id'];
      this.getMovieDetails(this.movieId);
    });
    this.movieMenu = [{id: 1, name: 'Discussões', children:[{}]},
      {id: 2, name: 'Resenhas', children:[{}]},
      {id: 3, name: 'Videos', children:[{}]},
      {id: 4, name: 'Imagens', children:[{}]},
      {id: 5, name: 'Alteracoes', children:[{}]},
      {id: 6, name: 'Reportar', children:[{}]},
      {id: 7, name: 'Compartilhar', children:[{}]},
      {id: 8, name: 'Editar', children:[{}]}          
    ];
  }

  ngOnInit() {}

  getMovieDetails(id) {
    this.dbService.getMovieDetails(id).subscribe((res: any) => {
      this.movie = res;
      this.getCast();
      this.titleService.setTitle(res.title);
      this.movie.vote_average = this.formatRatingValue(this.movie.vote_average);
      this.movie.poster_hd = `${environment.imgUrlHDPoster}${res.poster_path}`;
      this.movie.backdrop_hd = `${environment.imgUrlHDBg}${res.backdrop_path}`;
      this.movie.poster_path = `${environment.imgUrl}${this.movie.poster_path}`;
      this.movie.backdrop_path = `${environment.imgUrl}${
        this.movie.backdrop_path
      }`;
      
    });
  }

  formatRatingValue(value) {
    return value * 10;
  }

  getColorRating(value) {
    return this.GlobalFunctions.getColorRating(value);
  }

  getCast() {
    this.dbService.getCastMovie(this.movieId).subscribe(res => {
      this.movie.crew = res['crew'].slice(0, 10).map(crew => {
        crew.imgUrl = `${environment.imgUrl}${crew.profile_path}`;
          return crew;
      });
      this.movie.cast = res['cast'].slice(0, 10).map(cast => {
        cast.imgUrl = `${environment.imgUrl}${cast.profile_path}`;
        return cast;
      });
    });
  }
}
