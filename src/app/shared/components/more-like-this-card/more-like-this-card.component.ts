import { Component, Input, OnInit } from '@angular/core';
import { DecimalToPercentagePipe } from '../../pipes/decimal-to-percentage.pipe';
import { MinutesToHoursPipe } from "../../pipes/minutes-to-hours.pipe";
import { DatePipe } from '@angular/common';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
  selector: 'app-more-like-this-card',
  standalone: true,
  imports: [DecimalToPercentagePipe, MinutesToHoursPipe, DatePipe, TruncatePipe],
  templateUrl: './more-like-this-card.component.html',
  styleUrl: './more-like-this-card.component.scss'
})
export class MoreLikeThisCardComponent implements OnInit {
  @Input() item : any;
  @Input() isMovie : boolean = false;

  ngOnInit(){
    console.log(this.item)
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
