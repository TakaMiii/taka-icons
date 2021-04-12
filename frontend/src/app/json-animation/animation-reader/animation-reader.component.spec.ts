import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationReaderComponent } from './animation-reader.component';

describe('AnimationReaderComponent', () => {
  let component: AnimationReaderComponent;
  let fixture: ComponentFixture<AnimationReaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimationReaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimationReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
