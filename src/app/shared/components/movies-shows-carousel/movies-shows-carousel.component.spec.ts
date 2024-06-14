import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesShowsCarouselComponent } from './movies-shows-carousel.component';

describe('MoviesShowsCarouselComponent', () => {
  let component: MoviesShowsCarouselComponent;
  let fixture: ComponentFixture<MoviesShowsCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesShowsCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesShowsCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
