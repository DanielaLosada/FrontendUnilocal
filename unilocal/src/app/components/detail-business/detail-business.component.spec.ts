import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBusinessComponent } from './detail-business.component';

describe('DetailBusinessComponent', () => {
  let component: DetailBusinessComponent;
  let fixture: ComponentFixture<DetailBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailBusinessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
