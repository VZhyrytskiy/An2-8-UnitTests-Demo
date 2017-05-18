import { AngularUnitTestsPage } from './app.po';

describe('angular-unit-tests App', () => {
  let page: AngularUnitTestsPage;

  beforeEach(() => {
    page = new AngularUnitTestsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
