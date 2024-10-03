import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TmNgOdometerComponent } from './tm-ng-odometer.component';

describe('TmNgOdometerComponent', () => {
  let component: TmNgOdometerComponent;
  let fixture: ComponentFixture<TmNgOdometerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TmNgOdometerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TmNgOdometerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
