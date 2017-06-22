import { GrafosPage } from './app.po';

describe('grafos App', () => {
  let page: GrafosPage;

  beforeEach(() => {
    page = new GrafosPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
