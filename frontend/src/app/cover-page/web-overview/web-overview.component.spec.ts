import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebOverviewComponent } from './web-overview.component';

describe('WebOverviewComponent', () => {
  let component: WebOverviewComponent;
  let fixture: ComponentFixture<WebOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
