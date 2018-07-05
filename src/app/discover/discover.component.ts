import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MovieDBService } from '../services/movie-db.service';
import { GlobalServicesFuctions } from '../services/global-service.service';

@Component({
  selector: 'app-movies',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {
  itemList: any;
  options = { page: 1 };
  pager = { currentPage: 1, totalPages: 0 };
  isLoading = false;
  constructor(
    private titleService: Title,
    public DBService: MovieDBService,
    public GlobalFunctions: GlobalServicesFuctions,
    private router: Router
  ) {
    this.getDiscover(this.options);
    this.titleService.setTitle('Explorar');
  }

  ngOnInit() { }

  getColorRating(value) {
    return this.GlobalFunctions.getColorRating(value);
  }

  getDiscover(options) {
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;
    this.DBService.getDiscover('movie', options).subscribe(
      (res: any) => {
        this.pager.totalPages = res.total_pages;
        this.isLoading = false;
        this.itemList = this.DBService.formatMovies(res.results);
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 1000);
      },
      error => {
        this.isLoading = false;
      }
    );
  }

  changeSelection(options) {
    this.pager.currentPage = 1;
    options.page = 1;
    this.getDiscover(options);
  }

  like(e, movie) {
    e.stopPropagation();
    alert(movie.title);
  }

  goToMovieDetails(movie) {
    this.router.navigate(['/movie', movie.id]);
  }

  changePage(pageno) {
    this.pager.currentPage = pageno;
    this.options.page = pageno;
    this.getDiscover(this.options);
  }
}
