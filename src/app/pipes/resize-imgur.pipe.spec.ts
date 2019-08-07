import { ResizeImgurPipe } from './resize-imgur.pipe';
import { pipe } from 'rxjs';

describe('ResizeImgurPipe', () => {
  let imgurpipe: ResizeImgurPipe;

  beforeEach(() => {
    imgurpipe = new ResizeImgurPipe();
  });

  it('should change url', () => {
    expect(imgurpipe.transform('https://i.imgur.com/7FXcB8t.jpg', 't')).toBe('https://i.imgur.com/7FXcB8tt.jpg');
  });
});


