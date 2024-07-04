import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesShowsMoreInformationModalComponent } from './movies-shows-more-information-modal.component';

describe('MoviesShowsMoreInformationModalComponent', () => {
  let component: MoviesShowsMoreInformationModalComponent;
  let fixture: ComponentFixture<MoviesShowsMoreInformationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesShowsMoreInformationModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesShowsMoreInformationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
