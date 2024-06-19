import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { register as registerSwiperElements  } from 'swiper/element/bundle';


registerSwiperElements()

@Component({
  selector: 'app-movies-shows-carousel',
  standalone: true,
  imports: [],
  templateUrl: './movies-shows-carousel.component.html',
  styleUrl: './movies-shows-carousel.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MoviesShowsCarouselComponent {

  
  breakpoints = {
    0 : {
      slidesPerView : 1.5
    },
    450 : {
      slidesPerView : 2.3
    },
    640: {
      slidesPerView : 4.3
    },
    900: {
      slidesPerView : 5.3
    },
    1024: {
      slidesPerView : 6.3
    },
    1280: {
      slidesPerView : 8.3
    },
    1600: {
      slidesPerView : 10.3
    }
  }

  @Input() headerTitle: string= "";
  @Input() trendingMoviesAndShows: any[] = [];


}
