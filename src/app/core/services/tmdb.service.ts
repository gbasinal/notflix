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
   * Selects a random item from an array.
   *
   * @param {any[]} items - The array from which to select a random item.
   * @returns {any} A randomly selected item from the provided array.
   */
  getRandomItem(items: any[]): any {
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
  }

  getMovieDetails(movieId: number): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}`)
      .pipe(map((response: any) => response));
  }
}
