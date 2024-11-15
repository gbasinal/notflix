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
    let flag = Math.floor(Math.random() * 2);
    this.getPopularMoviesAndShows(flag);
  }

  getMovieDetails(id : number){
    this.tmdbService.getMovieDetails(id).subscribe(movie => {
      // console.log(movie)
    })
  }

  limitDescription(description : string){
    return description.substring(0, 150) + "...";
  }

  getPopularMoviesAndShows(flag : number){
    if(flag == 1){
      this.tmdbService.getPopularShows().subscribe(shows => {
        const randomMovie = this.tmdbService.getRandomItem(shows);
        this.bannerImg = this.baseImgUrl + randomMovie.backdrop_path;
        this.bannerDescription = this.limitDescription(randomMovie.overview);
        this.bannerTitle = randomMovie.name;
        this.bannerId = randomMovie.id;
      })
    }else{
      this.tmdbService.getPopularMovies().subscribe(movies => {
        const randomMovie = this.tmdbService.getRandomItem(movies);
        this.bannerImg = this.baseImgUrl + randomMovie.backdrop_path;
        this.bannerDescription = this.limitDescription(randomMovie.overview);
        this.bannerTitle = randomMovie.title;
        this.bannerId = randomMovie.id;
      })
    }

  }
}
