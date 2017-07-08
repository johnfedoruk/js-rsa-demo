import { JavacryptSdkPage } from './app.po';

describe('javacrypt-sdk App', () => {
  let page: JavacryptSdkPage;

  beforeEach(() => {
    page = new JavacryptSdkPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
