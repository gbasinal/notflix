import { Component } from '@angular/core';
import { MoviesShowsCarouselComponent } from '../../shared/components/movies-shows-carousel/movies-shows-carousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MoviesShowsCarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
