import { PasteleriaFEPage } from './app.po';

describe('pasteleria-fe App', () => {
  let page: PasteleriaFEPage;

  beforeEach(() => {
    page = new PasteleriaFEPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
