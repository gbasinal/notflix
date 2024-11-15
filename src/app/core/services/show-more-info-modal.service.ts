import { inject, Injectable } from '@angular/core';
import { TmdbService } from './tmdb.service';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MoviesShowsMoreInformationModalComponent } from '../../shared/components/movies-shows-more-information-modal/movies-shows-more-information-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ShowMoreInfoModalService {
  readonly dialogRef = inject(MatDialog);
  constructor(
    private tmdbService : TmdbService,

  ) { }

  getMoviesShowsMoreInfo(id: number, isMovie: boolean): Observable<any> {
    const fetchDetails = isMovie
      ? this.tmdbService.getMovieDetails(id)
      : this.tmdbService.getTvShowSeriesDetails(id);

    const fetchTrailer = isMovie
      ? this.tmdbService.getMovieTrailers(id)
      : this.tmdbService.getTVShowTrailers(id);

    const fetchCredits = isMovie
      ? this.tmdbService.getMovieCredits(id)
      : this.tmdbService.getTVShowCredits(id);

    const fetchSimilarItems = isMovie
      ? this.tmdbService.getSimilarMovies(id)
      : this.tmdbService.getSimilarTVShows(id);

    return forkJoin([fetchDetails, fetchTrailer, fetchCredits, fetchSimilarItems]);
  }

  openMoviesShowsMoreInfoDialog(id: number, isMovie: boolean): void {
    this.getMoviesShowsMoreInfo(id, isMovie).pipe(
      catchError(error => {
        console.error('Error fetching details or trailer, try again later', error);
        throw error;
      })
    ).subscribe(([details, trailer, credits, similarItems]) => {
      this.dialogRef.open(MoviesShowsMoreInformationModalComponent, {
        data: { details, trailer, credits, similarItems, isMovie },
        panelClass: 'preview-modal-container',
      });
    });
  }
}
