import { AppPage } from './app.po';
import { by, element, browser} from 'protractor';

describe('City forecast App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('City Forecast');
  });


  it('should display a new forecast', () => {
    page.navigateTo();

    element(by.css('input[type="text"]')).sendKeys('Brighton');
    element(by.css('button')).click();

    browser.waitForAngular();

    const forecastList = element.all(by.css('li'));
    expect(forecastList.count()).toEqual(1);
  });

  it('button should be disabled', () => {
    page.navigateTo();

    const button = element(by.css('button'));

    element(by.css('input[type="text"]')).sendKeys('Brighton');
    button.click();

    browser.waitForAngular();

    button.click();

    expect(button.getAttribute('disabled')).toEqual('true');
  });


  it('should display 2 new forecasts', () => {
    page.navigateTo();

    const input = element(by.css('input[type="text"]'));
    const button = element(by.css('button'));

    input.sendKeys('Brighton');
    button.click();

    browser.waitForAngular();

    input.sendKeys('London');
    button.click();

    browser.waitForAngular();

    const forecastList = element.all(by.css('li'));
    expect(forecastList.count()).toEqual(2);
  });

  it('should display one new forecast when duplicate city entered', () => {
    page.navigateTo();

    const input = element(by.css('input[type="text"]'));
    const button = element(by.css('button'));

    input.sendKeys('Brighton');
    button.click();

    browser.waitForAngular();

    input.sendKeys('Brighton');
    button.click();

    browser.waitForAngular();

    const forecastList = element.all(by.css('li'));
    expect(forecastList.count()).toEqual(1);
  });

  it('should display one forecast when two added and one removed', () => {
    page.navigateTo();

    const input = element(by.css('input[type="text"]'));
    const button = element(by.css('button'));

    input.sendKeys('Brighton');
    button.click();

    browser.waitForAngular();

    input.sendKeys('London');
    button.click();

    browser.waitForAngular();

    element.all(by.css('.remove-forecast')).get(0).click();

    browser.waitForAngular();

    const forecastList = element.all(by.css('li'));
    expect(forecastList.count()).toEqual(1);
  });

  it('should display correct city name', () => {
    page.navigateTo();

    const input = element(by.css('input[type="text"]'));
    const button = element(by.css('button'));

    input.sendKeys('Brighton');
    button.click();

    browser.waitForAngular();

    input.sendKeys('London');
    button.click();

    browser.waitForAngular();

    const cityNameOne = element.all(by.css('.forecast-item-title-name')).get(0);
    expect(cityNameOne.getText()).toEqual('Brighton');

    const cityNameTwo = element.all(by.css('.forecast-item-title-name')).get(1);
    expect(cityNameTwo.getText()).toEqual('London');
  });
});
