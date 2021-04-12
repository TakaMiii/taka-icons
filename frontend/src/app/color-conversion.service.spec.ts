import { TestBed } from '@angular/core/testing';

import { ColorConversionService } from './color-conversion.service';

describe('ColorConversionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ColorConversionService = TestBed.get(ColorConversionService);
    expect(service).toBeTruthy();
  });
});
