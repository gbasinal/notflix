import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, Input, OnInit, Renderer2, ViewChildren,AfterViewInit, QueryList, ViewChild } from '@angular/core';
import { register as registerSwiperElements  } from 'swiper/element/bundle';
import { PreviewModalComponent } from '../preview-modal/preview-modal.component';
import { TmdbService } from '../../../core/services/tmdb.service';
import { DebouncerService } from '../../../core/services/debouncer.service';


registerSwiperElements()

@Component({
  selector: 'app-movies-shows-carousel',
  standalone: true,
  imports: [PreviewModalComponent],
  templateUrl: './movies-shows-carousel.component.html',
  styleUrl: './movies-shows-carousel.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MoviesShowsCarouselComponent implements AfterViewInit {
  @ViewChildren('itemSlider') itemSliders!: QueryList<ElementRef>;
  @ViewChild('modalItem') modalItem! : ElementRef;

  @Input() headerTitle: string= "";
  @Input() moviesAndShowsArray: any[] = [];

  hoveredItem : any;
  itemType : string = "movie";
  itemPosition : any;
  indexCount : number = 0

  breakpoints = {
    0 : {
      slidesPerView : 1.5
    },
    450 : {
      slidesPerView : 2.3
    },
    640: {
      slidesPerView : 4.3
    },
    900: {
      slidesPerView : 5.3
    },
    1024: {
      slidesPerView : 6.3
    },
    1280: {
      slidesPerView : 8.3
    },
    1600: {
      slidesPerView : 10.3
    }
  }

  constructor(
    private renderer: Renderer2,
    private TMDBService: TmdbService,
    private debouncerService : DebouncerService,
  ){}

  ngAfterViewInit() : void {
    const debouncedHover = this.debouncerService.debounce(this.getSliderPostionOnHover.bind(this),150)
    this.itemSliders.forEach((item, index) => {
      this.renderer.listen(item.nativeElement, 'mouseover', (event: MouseEvent) => {
        debouncedHover(event,this.moviesAndShowsArray[index]);
        this.indexCount = index;
      })
    })
  }
  
  getSliderPostionOnHover(ev : MouseEvent, item : any){
    const rect = (ev.target as HTMLElement).getBoundingClientRect();
    this.itemPosition = rect;
    if(item.media_type === 'movie'){
      this.TMDBService.getMovieDetails(item.id).subscribe(movieDetails => {
        // console.log(movieDetails)
        this.itemType = "movie";
        this.hoveredItem = movieDetails;
      })
    }else {
      this.TMDBService.getTvShowSeriesDetails(item.id).subscribe(tvDetails => {
        // console.log(tvDetails)
        this.itemType = "tv";
        this.hoveredItem = tvDetails;
      })
  
    }
  }

}
