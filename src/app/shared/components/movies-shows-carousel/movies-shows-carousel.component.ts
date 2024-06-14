import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { register as registerSwiperElements  } from 'swiper/element/bundle';
import { TmdbService } from '../../../core/services/tmdb.service';


registerSwiperElements()

@Component({
  selector: 'app-movies-shows-carousel',
  standalone: true,
  imports: [],
  templateUrl: './movies-shows-carousel.component.html',
  styleUrl: './movies-shows-carousel.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MoviesShowsCarouselComponent implements OnInit  {
  trendingMoviesAndShows: any[] = [];

  constructor(
    private tmdbService: TmdbService,
  ) {}

  ngOnInit(): void {
    this.tmdbService.getAllTrendingMoviesAndShows().subscribe((response) => {
      console.log(response);
      this.trendingMoviesAndShows = response;
      console.log(this.trendingMoviesAndShows)
    });
  }
}
