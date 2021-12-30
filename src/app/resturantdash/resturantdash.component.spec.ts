import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResturantdashComponent } from './resturantdash.component';

describe('ResturantdashComponent', () => {
  let component: ResturantdashComponent;
  let fixture: ComponentFixture<ResturantdashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResturantdashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResturantdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
