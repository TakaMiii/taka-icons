import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakaIconComponent } from './taka-icon.component';

describe('TakaIconComponent', () => {
  let component: TakaIconComponent;
  let fixture: ComponentFixture<TakaIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakaIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakaIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
