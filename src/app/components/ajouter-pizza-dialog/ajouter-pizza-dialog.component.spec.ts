import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterPizzaDialogComponent } from './ajouter-pizza-dialog.component';

describe('AjouterPizzaDialogComponent', () => {
  let component: AjouterPizzaDialogComponent;
  let fixture: ComponentFixture<AjouterPizzaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouterPizzaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterPizzaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
