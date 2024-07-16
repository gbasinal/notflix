import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TmdbService {
  private apiKey = 'fe2092611ef02176685cba944905e41b';
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  ////// Movies Related Services //////////////////////////////////////////////////////////////////

  /**
   * Fetches a list of popular movies from the TMDB API.
   *
   * @returns {Observable<any>} An observable containing the list of popular movies.
   * The response is mapped to extract the 'results' property, which contains the array of movies.
   */
  getPopularMovies(): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/movie/popular?api_key=${this.apiKey}`)
      .pipe(map((response: any) => response.results));
  }

  /**
   * Fetches detailed information about a specific movie from the TMDB API.
   *
   * @param {number} movieId - The unique identifier of the movie.
   * @returns {Observable<any>} An observable containing the detailed information about the movie.
   */
  getMovieDetails(movieId: number): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}`)
      .pipe(map((response: any) => response));
  }

  /**
   * Fetches a sample of images associated with a specific movie from the TMDB API.
   *
   * @param {number} movieId - The unique identifier of the movie.
   * @returns {Observable<any>} An observable containing the sample of images associated with the movie.
   * The response is mapped to extract the 'results' property, which contains the array of images.
   */
  getImageSampleFromMovie(movieId: number): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/movie/${movieId}/images?api_key=${this.apiKey}`)
      .pipe(map((response: any) => response.results));
  }

  /**
   * Fetches a list of currently playing movies from the TMDB API.
   *
   * @param {string} region - The region for which to fetch the list of now playing movies.
   * @returns {Observable<any>} An observable containing the list of now playing movies.
   * The response is mapped to extract the 'results' property, which contains the array of movies.
   */
  getNowPlayingMovies(region: string): Observable<any> {
    const url = `${this.baseUrl}/movie/now_playing?api_key=${this.apiKey}${
      region ? `&region=${region} ` : ''
    }`;
    return this.http.get(url).pipe(map((response: any) => response.results));
  }

  /**
   * Fetches a list of upcoming movies from the TMDB API.
   *
   * @param {string} region - The region for which to fetch the list of upcoming movies.
   * @returns {Observable<any>} An observable containing the list of upcoming movies.
   * The response is mapped to extract the 'results' property, which contains the array of movies.
   */
  getUpcomingMovies(region: string): Observable<any> {
    const url = `${this.baseUrl}/movie/upcoming?api_key=${this.apiKey}${
      region ? `&region=${region}` : ''
    }`;
    return this.http.get(url).pipe(map((response: any) => response.results));
  }

  /**
   * Fetches a list of top-rated movies from the TMDB API.
   *
   * @param {string} region - The region for which to fetch the list of top-rated movies.
   * @returns {Observable<any>} An observable containing the list of top-rated movies.
   * The response is mapped to extract the 'results' property, which contains the array of movies.
   */
  getTopRatedMovies(region: string): Observable<any> {
    const url = `${this.baseUrl}/movie/top_rated?api_key=${this.apiKey}${
      region ? `&region=${region} ` : ''
    }`;
    return this.http.get(url).pipe(map((response: any) => response.results));
  }

  getAllMovieGenres(): Observable<any>{
    return this.http
     .get(`${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}`)
     .pipe(map((response: any) => response.genres));
  }

  getMovieTrailers(id: number): Observable<any>{
    return this.http
     .get(`${this.baseUrl}/movie/${id}/videos?api_key=${this.apiKey}`)
     .pipe(map((response: any) => response.results));
  }

  getMovieCredits(id:  number): Observable<any>{
    return this.http
     .get(`${this.baseUrl}/movie/${id}/credits?api_key=${this.apiKey}`)
     .pipe(map((response: any) => response.cast));
  }

  getSimilarMovies(id: number): Observable<any>{
    return this.http
     .get(`${this.baseUrl}/movie/${id}/similar?api_key=${this.apiKey}`)
     .pipe(map((response: any) => response.results));
  }

  // END Movies Related Services //////////////////////////////////////////////////////////////////

  // TV Shows Related Services //////////////////////////////////////////////////////////////////

  /**
   * Fetches a list of popular TV shows from the TMDB API.
   *
   * @returns {Observable<any>} An observable containing the list of popular TV shows.
   * The response is mapped to extract the 'results' property, which contains the array of shows.
   */
  getPopularShows(): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/tv/popular?api_key=${this.apiKey}`)
      .pipe(map((response: any) => response.results));
  }

  /**
   * Fetches detailed information about a specific TV show from the TMDB API.
   *
   * @param {string} tvShowId - The unique identifier of the TV show.
   * @returns {Observable<any>} An observable containing the detailed information about the TV show.
   */
  getTvShowSeriesDetails(tvShowId: number): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/tv/${tvShowId}?api_key=${this.apiKey}`)
      .pipe(map((response: any) => response));
  }

  getAllTVGenres(): Observable<any>{
    return this.http
     .get(`${this.baseUrl}/genre/tv/list?api_key=${this.apiKey}`)
     .pipe(map((response: any) => response.genres));
  }

  getTVShowTrailers(id: number): Observable<any>{
    return this.http
     .get(`${this.baseUrl}/tv/${id}/videos?api_key=${this.apiKey}`)
     .pipe(map((response: any) => response.results));
  }

  getTVShowCredits(id:  number): Observable<any>{
    return this.http
     .get(`${this.baseUrl}/tv/${id}/credits?api_key=${this.apiKey}`)
     .pipe(map((response: any) => response.cast));
  }

  getSimilarTVShows(id: number): Observable<any>{
    return this.http
     .get(`${this.baseUrl}/tv/${id}/similar?api_key=${this.apiKey}`)
     .pipe(map((response: any) => response.results));
  }

  // END TV Shows Related Services ///////////////////////////////////////////////////////////////////

  // Both Movies and TV Shows Related Services //////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Selects a random item from an array.
   *
   * @param {any[]} items - The array from which to select a random item.
   * @returns {any} A randomly selected item from the provided array.
   */
  getRandomItem(items: any[]): any {
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
  }

  /**
   * Fetches a list of all trending movies and TV shows for the current week from the TMDB API.
   *
   * @returns {Observable<any>} An observable containing the list of trending movies and TV shows.
   * The response is mapped to extract the 'results' property, which contains the array of items.
   */
  getAllTrendingMoviesAndShows(): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/trending/all/week?api_key=${this.apiKey}`)
      .pipe(map((response: any) => response.results));
  }

  // END Both Movies and TV Shows Related Services //////////////////////////////////////////////////////////////////////////////////////////////////


  

}
