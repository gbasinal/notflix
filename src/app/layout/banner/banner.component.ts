import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../../core/services/tmdb.service';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent implements OnInit {
  baseImgUrl : string = "https://image.tmdb.org/t/p/original/";
  bannerImg : string = "";
  bannerDescription : string = "";
  bannerTitle : string = "";
  bannerId : number = 0;

  constructor(private tmdbService : TmdbService){}

  ngOnInit(): void {
      this.tmdbService.getPopularMovies().subscribe(movies => {
        console.log(movies)
        const randomMovie = this.tmdbService.getRandomItem(movies);
        this.bannerImg = this.baseImgUrl + randomMovie.backdrop_path;
        this.bannerDescription = this.limitDescription(randomMovie.overview);
        this.bannerTitle = randomMovie.title;
        this.bannerId = randomMovie.id;
      })
  }

  getMovieDetails(id : number){
    this.tmdbService.getMovieDetails(id).subscribe(movie => {
      console.log(movie)
    })
  }

  limitDescription(description : string){
    return description.substring(0, 150) + "...";
  }
}
