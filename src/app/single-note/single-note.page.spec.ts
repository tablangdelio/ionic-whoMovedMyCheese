import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SingleNotePage } from './single-note.page';

describe('SingleNotePage', () => {
  let component: SingleNotePage;
  let fixture: ComponentFixture<SingleNotePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleNotePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SingleNotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
