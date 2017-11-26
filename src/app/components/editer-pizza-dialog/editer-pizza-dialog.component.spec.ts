import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditerPizzaDialogComponent } from './editer-pizza-dialog.component';

describe('EditerPizzaDialogComponent', () => {
  let component: EditerPizzaDialogComponent;
  let fixture: ComponentFixture<EditerPizzaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditerPizzaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditerPizzaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
