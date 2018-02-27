import { UnixToTimePipe } from './unix-to-time.pipe';

describe('UnixToTimePipe', () => {
  it('create an instance', () => {
    const pipe = new UnixToTimePipe();
    expect(pipe).toBeTruthy();
  });
});
