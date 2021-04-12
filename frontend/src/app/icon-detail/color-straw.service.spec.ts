import { TestBed } from '@angular/core/testing';

import { ColorStrawService } from './color-straw.service';

describe('ColorStrawService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ColorStrawService = TestBed.get(ColorStrawService);
    expect(service).toBeTruthy();
  });
});
