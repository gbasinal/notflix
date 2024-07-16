import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreLikeThisCardComponent } from './more-like-this-card.component';

describe('MoreLikeThisCardComponent', () => {
  let component: MoreLikeThisCardComponent;
  let fixture: ComponentFixture<MoreLikeThisCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoreLikeThisCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoreLikeThisCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
