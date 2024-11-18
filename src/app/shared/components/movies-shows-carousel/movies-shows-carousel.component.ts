import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, Input, Output, EventEmitter, OnInit, Renderer2, ViewChildren,AfterViewInit, QueryList, ViewChild, ChangeDetectorRef, AfterViewChecked  } from '@angular/core';
import { register as registerSwiperElements  } from 'swiper/element/bundle';
import { PreviewModalComponent } from '../preview-modal/preview-modal.component';
import { TmdbService } from '../../../core/services/tmdb.service';
import { DebouncerService } from '../../../core/services/debouncer.service';
import { MoviesShowsMoreInformationModalComponent } from '../movies-shows-more-information-modal/movies-shows-more-information-modal.component';
import { DeviceService } from '../../../core/services/device.service';
import { ShowMoreInfoModalService } from '../../../core/services/show-more-info-modal.service';


registerSwiperElements()

@Component({
  selector: 'app-movies-shows-carousel',
  standalone: true,
  imports: [PreviewModalComponent, MoviesShowsMoreInformationModalComponent],
  templateUrl: './movies-shows-carousel.component.html',
  styleUrl: './movies-shows-carousel.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MoviesShowsCarouselComponent implements AfterViewInit {
  @ViewChildren('itemSlider') itemSliders!: QueryList<ElementRef>;
  @ViewChild('modalItem') modalItem! : ElementRef;

  @Input() headerTitle: string= "";
  @Input() moviesAndShowsArray: any[] = [];
  @Input() genresArray: any[] = [];

  @Output() selectedCarouselTitle = new EventEmitter<any>();

  hoveredItem : any;
  itemType : string = "movie";
  itemPosition : any;
  indexCount : number = 0
  filteredGenres : any[] = [];

  private listeners : (()=> void) [] = [];

  breakpoints = {
    0 : {
      slidesPerView : 2.1
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
    private cdr : ChangeDetectorRef,
    private deviceService : DeviceService,
    private showMoreInfoModalService : ShowMoreInfoModalService
  ){}

  ngAfterViewInit() : void {
    const debouncedHover = this.debouncerService.debounce(this.getSliderPostionOnHover.bind(this),2)




    this.itemSliders.changes.subscribe((queryList: QueryList<ElementRef>)=>{
      console.log(queryList.toArray())
      queryList.toArray().forEach((item, index) => {
        this.renderer.listen(item.nativeElement, 'pointerenter', (event: PointerEvent) =>{
          this.handlePointerEnter(event, index, debouncedHover)
        })
        this.renderer.listen(item.nativeElement, 'pointerleave', () =>{
          this.handlePointerLeave();
        })
      })
    })


    if (this.itemSliders.length > 0) {
      this.itemSliders.toArray().forEach((item, index) => {
        this.renderer.listen(
          item.nativeElement,
          'pointerenter',
          (event: PointerEvent) => {
            this.handlePointerEnter(event, index, debouncedHover);
          }
        );
  
        this.renderer.listen(item.nativeElement, 'pointerleave', () => {
          this.handlePointerLeave();
        });
      });
    }
  }

  private handlePointerEnter(
    event: PointerEvent,
    index: number,
    debouncedHover: Function
  ) {
    const isMovie = this.moviesAndShowsArray[index]?.media_type === 'movie';
  
    if (!this.deviceService.isMobile) {
      debouncedHover(event, this.moviesAndShowsArray[index]);
      this.indexCount = index;
      this.selectedCarouselTitle.emit(this.headerTitle);
    } else {
      this.showMoreInfoModalService.openMoviesShowsMoreInfoDialog(
        this.moviesAndShowsArray[index]?.id,
        isMovie
      );
    }
  
    this.cdr.detectChanges();
  }
  
  private handlePointerLeave() {
    this.selectedCarouselTitle.emit(this.headerTitle);
    this.cdr.detectChanges();
  }
  

  private getSliderPostionOnHover(ev : MouseEvent, item : any){
    const rect = (ev.target as HTMLElement).getBoundingClientRect();
    this.itemPosition = rect;
    this.hoveredItem = item;
    this.filterGenres(item.genre_ids)
    if(item.media_type === 'movie' || item.title){
      this.itemType = "movie";
    }else if(item.media_type ==="tv" || item.name ) {
      this.itemType = "tv";
    }
  }

  private filterGenres(genreIdArr : number[]){
    const genres = genreIdArr;
    this.filteredGenres = this.genresArray.filter(genre => genres.includes(genre.id))
  } 

}
