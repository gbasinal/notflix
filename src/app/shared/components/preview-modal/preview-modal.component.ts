import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MinutesToHoursPipe } from '../../pipes/minutes-to-hours.pipe';
import { DecimalToPercentagePipe } from '../../pipes/decimal-to-percentage.pipe';
import {trigger, state, style, transition, animate} from '@angular/animations';
import { TruncatePipe } from '../../pipes/truncate.pipe';

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
      })),
      state('visible', style({
        opacity: 1,
        visibility: 'visible',
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

  constructor(
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
}
