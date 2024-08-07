import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild, inject } from '@angular/core';
import { MinutesToHoursPipe } from '../../pipes/minutes-to-hours.pipe';
import { DecimalToPercentagePipe } from '../../pipes/decimal-to-percentage.pipe';
import {trigger, state, style, transition, animate} from '@angular/animations';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { TmdbService } from '../../../core/services/tmdb.service';
import {MatDialog, MatDialogRef}  from '@angular/material/dialog'
import { MoviesShowsMoreInformationModalComponent } from '../movies-shows-more-information-modal/movies-shows-more-information-modal.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-preview-modal',
  standalone: true,
  imports: [MinutesToHoursPipe, DecimalToPercentagePipe, TruncatePipe],
  templateUrl: './preview-modal.component.html',
  styleUrl: './preview-modal.component.scss',
  animations: [
    trigger('previewModalAnimation',[
      state('void',style({
        opacity: 0,
        visibility: 'hidden',
        transform: 'scale(.2)'
      })),
      state('visible', style({
        opacity: 1,
        visibility: 'visible',
        transform: 'translateY(-30%) scale(1.5)'
      })),
      transition('void => visible',[
        animate('0.5s cubic-bezier(0.68, -0.6, 0.32, 1.6)')
      ]),
      transition('visible => void',[
        animate('0.5s cubic-bezier(0.68, -0.6, 0.32, 1.6)')
      ])
    ])
  ]
})
export class PreviewModalComponent implements AfterViewInit {
  @Input() item : any;
  @Input() itemType : string = "";
  @Input() itemPosition : any;
  @Input() indexCount : number = 0 ;
  @Input() filteredGenres : any[] = [];

  @ViewChild('modalItem') modalItem! : ElementRef;

  baseImgUrl : string = "https://image.tmdb.org/t/p/original/";
  rateClass : string = "red"
  isVisible : boolean = false;
  readonly dialogRef = inject(MatDialog);

  constructor(
    private tmdbService : TmdbService,

  ){

  }

  ngAfterViewInit() : void {
    this.isVisible = true;
    this.item = null;
  }

  resetModal() : void {
    this.item = null;
  }

  getVoteCategory(vote : number) {
    if(vote > 7.5){
      return "green";
    }else if(vote > 5){
      return "yellow";
    }else if(vote > 2.5){
      return "orange";
    }else{
      return "red";
    }
  }

  openMoviesShowsMoreInfoModal(id : number, isMovie : boolean) : void {
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


    forkJoin([fetchDetails,fetchTrailer, fetchCredits, fetchSimilarItems]).subscribe(([details, trailer, credits, similarItems])=> {
      console.log(trailer)
      this.dialogRef.open(MoviesShowsMoreInformationModalComponent,{
        data : {details, trailer, credits, similarItems, isMovie},
        panelClass: 'preview-modal-container'
      })
    },(error)=> {
      console.error('Error fetching details or trailer, try again later', error);
    })

  }
}
