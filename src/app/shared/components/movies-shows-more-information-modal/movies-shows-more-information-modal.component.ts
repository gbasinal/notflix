import { DatePipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit, inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef}  from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MinutesToHoursPipe } from '../../pipes/minutes-to-hours.pipe';
import { DecimalToPercentagePipe } from '../../pipes/decimal-to-percentage.pipe';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { MoreLikeThisCardComponent } from '../more-like-this-card/more-like-this-card.component';


@Component({
  selector: 'app-movies-shows-more-information-modal',
  standalone: true,
  imports: [DatePipe, MinutesToHoursPipe, DecimalToPercentagePipe, TruncatePipe, MoreLikeThisCardComponent],
  templateUrl: './movies-shows-more-information-modal.component.html',
  styleUrl: './movies-shows-more-information-modal.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MoviesShowsMoreInformationModalComponent implements OnInit{
  data = inject(MAT_DIALOG_DATA);
  details : any;
  videoSrc!: SafeResourceUrl; 
  private sanitizer = inject(DomSanitizer);
  casts ! : any[];
  isMovie : boolean = false;
  similarItems : any[] = [];

  ngOnInit(): void {
      this.processData(this.data);
  }

  processData(data : any) : void {
    const {details , trailer, credits, similarItems, isMovie} = data;
    this.details = details;
    this.casts = credits.slice(0,5);
    this.processTrailer(trailer);
    this.isMovie = isMovie;
    this.similarItems = similarItems.slice(0, 9);
  }

  processTrailer(trailers : any[]): void {
    const filteredTrailers = trailers.filter( (trailer)=>{
      return trailer.type == 'Trailer'
    })
    if(filteredTrailers.length > 0){
      const filteredTrailer = filteredTrailers[Math.floor(Math.random() * filteredTrailers.length)];
      this.videoSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube.com/embed/${filteredTrailer.key}?autoplay=1&controls=0&mute=1&modestbranding=1&rel=0&showinfo=0`
      );
    }
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
}
