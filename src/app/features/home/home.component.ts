import { Component } from '@angular/core';
import { MoviesShowsCarouselComponent } from '../../shared/components/movies-shows-carousel/movies-shows-carousel.component';
import { TmdbService } from '../../core/services/tmdb.service';
import { LocaleService } from '../../core/services/locale.service';
import { async } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MoviesShowsCarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  trendingMoviesAndShows: any[] = [];
  upcomingMovies: any[] = [];
  nowPlayingMovies: any[] = [];
  topRatedMovies : any[] = [];

  region : string = '';
  constructor(
    private tmdbService: TmdbService,
    private localeService : LocaleService
  ) {
    this.region = this.localeService.getSystemLocale();
  }
  ngOnInit(): void {

    this.tmdbService.getAllTrendingMoviesAndShows().subscribe((response) => {
      this.trendingMoviesAndShows = response;
    });

    this.tmdbService.getUpcomingMovies(this.region).subscribe((response)=>{
      this.upcomingMovies = response;
    })

    this.tmdbService.getNowPlayingMovies(this.region).subscribe((response)=> {
      this.nowPlayingMovies = response;
    })

    this.tmdbService.getTopRatedMovies(this.region).subscribe((response)=>{
      this.topRatedMovies = response;
    })
    
  }
}
