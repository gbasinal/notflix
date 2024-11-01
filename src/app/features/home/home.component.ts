import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// Components
import { MoviesShowsCarouselComponent } from '../../shared/components/movies-shows-carousel/movies-shows-carousel.component';
import { PreviewModalComponent } from '../../shared/components/preview-modal/preview-modal.component';
// Services
import { TmdbService } from '../../core/services/tmdb.service';
import { LocaleService } from '../../core/services/locale.service';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MoviesShowsCarouselComponent, PreviewModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent {
  trendingMoviesAndShows: any[] = [];
  upcomingMovies: any[] = [];
  nowPlayingMovies: any[] = [];
  topRatedMovies : any[] = [];
  movieGenres : any[] = [];
  tvShowGenres : any[] = [];
  allGenres : any[] = [];

  isHoveredTitle : any = '';

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

    this.tmdbService.getAllMovieGenres().subscribe((response)=>{
      this.movieGenres = response;
    })

    this.tmdbService.getAllTVGenres().subscribe((response)=>{
      this.tvShowGenres = response;
    })
    this.mergeAllGenres()
  }

  mergeAllGenres(){
    const combinedGenres = this.movieGenres.concat(this.tvShowGenres);
    this.allGenres = combinedGenres.filter((item, index, self) => index === self.findIndex((t) => t.id === item.id));
  }

  checkOnHoverOfItem(title : any) {
    this.isHoveredTitle = title;
  }
}
