import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoriesDetailsComponent } from './subcategories-details.component';

describe('SubcategoriesDetailsComponent', () => {
  let component: SubcategoriesDetailsComponent;
  let fixture: ComponentFixture<SubcategoriesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubcategoriesDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SubcategoriesDetailsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
