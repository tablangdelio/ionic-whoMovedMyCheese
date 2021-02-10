import { TestBed } from '@angular/core/testing';

import { BookContentsService } from './book-contents.service';

describe('BookContentsService', () => {
  let service: BookContentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookContentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
