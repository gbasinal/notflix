import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { MinutesToHoursPipe } from '../../pipes/minutes-to-hours.pipe';
import { DecimalToPercentagePipe } from '../../pipes/decimal-to-percentage.pipe';


@Component({
  selector: 'app-preview-modal',
  standalone: true,
  imports: [MinutesToHoursPipe, DecimalToPercentagePipe],
  templateUrl: './preview-modal.component.html',
  styleUrl: './preview-modal.component.scss'
})
export class PreviewModalComponent implements AfterViewInit {
  @Input() item : any;
  @Input() itemType : string = "";
  @Input() itemPosition : any;

  baseImgUrl : string = "https://image.tmdb.org/t/p/original/";
  rateClass : string = "red"

  ngAfterViewInit() : void {
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
