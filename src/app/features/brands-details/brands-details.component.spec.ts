import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsDetailsComponent } from './brands-details.component';

describe('BrandsDetailsComponent', () => {
  let component: BrandsDetailsComponent;
  let fixture: ComponentFixture<BrandsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandsDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BrandsDetailsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
