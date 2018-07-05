import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  BrowserModule,
  HAMMER_GESTURE_CONFIG,
  HammerGestureConfig
} from '@angular/platform-browser';
import { DiscoverComponent } from './discover/discover.component';
import { environment } from '../environments/environment';
import { FilterComponent } from './shared/filter/filter.component';
import { FormsModule } from '@angular/forms';
import { GlobalServicesFuctions } from './services/global-service.service';
import { HttpClientModule } from '@angular/common/http';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MovieDBService } from './services/movie-db.service';
import { MovieDetailsComponent} from './movie-details/movie-details.component';
import { MoviesComponent } from './movies/movies.component';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SharedModule } from './shared/shared.module';
import { SwService } from './services/sw.service';
import { FooterComponent } from './shared/footer/footer.component';
export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any>{
    pinch: { enable: false },
    rotate: { enable: false }
  };
}

@NgModule({
  declarations: [
    AppComponent,
    DiscoverComponent,
    MovieDetailsComponent,
    MoviesComponent,
    FilterComponent,
    FooterComponent
  ],
  imports: [
    Angular2FontawesomeModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    LazyLoadImageModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    })
  ],
  providers: [
    { provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig },
    MovieDBService,
    GlobalServicesFuctions,
    SwService
  ],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule {}
