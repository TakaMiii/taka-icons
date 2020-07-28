import { TestBed } from '@angular/core/testing';

import { ConnectChatService } from './connect-chat.service';

describe('ConnectChatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConnectChatService = TestBed.get(ConnectChatService);
    expect(service).toBeTruthy();
  });
});
