import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupprimerPizzaDialogComponent } from './supprimer-pizza-dialog.component';

describe('SupprimerPizzaDialogComponent', () => {
  let component: SupprimerPizzaDialogComponent;
  let fixture: ComponentFixture<SupprimerPizzaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupprimerPizzaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupprimerPizzaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
