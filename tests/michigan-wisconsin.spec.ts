import { test, expect } from '@playwright/test';
import { dateData } from './utils/common.helpers';
import { fillSearchForm } from './utils/michigan-wisconsin.helpers';
import { MICHIGAN_PARKS, SEARCH_PARAMS, WISCONSIN_PARKS } from './utils/constants';

const { ARRIVAL_DATE, DEPARTURE_DATE } = SEARCH_PARAMS;

const currentData = dateData(new Date().toISOString());
const arrivalData = dateData(ARRIVAL_DATE);
const departureData = dateData(DEPARTURE_DATE);

test.beforeAll(async () => {
  console.log('currentData', currentData);
  console.log('arrivalData', arrivalData);
  console.log('departureData', departureData);
});

test.describe('Michigan State Parks', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://midnrreservations.com/');
    await fillSearchForm(page, arrivalData, currentData, departureData);
  });
  
  test.afterEach(async ({ page }, testInfo) => {
    // enter park name and search
    await page.locator('#park-field svg').click();
    await page.getByText(testInfo.title).click();
    await page.locator('#actionSearch').click();
  
    // search for availability icon
    await page.locator('#list-view-button-button').click();
    await page.waitForTimeout(2000);
    await page.screenshot({
      path: `screenshots/MI_${testInfo.title}_${arrivalData.month}-${arrivalData.day}_${departureData.month}-${departureData.day}.png`, fullPage: true }
    );
    await expect(page.locator('#availability-0')).toBeVisible();
  });
  
  MICHIGAN_PARKS.forEach(park => {
    test(park, async () => {});
  });
});

test.describe('Wisconsin State Parks', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://wisconsin.goingtocamp.com/');
    await fillSearchForm(page, arrivalData, currentData, departureData);
  });
  
  test.afterEach(async ({ page }, testInfo) => {
    // enter park name and search
    await page.locator('#park-field svg').click();
    await page.getByText(testInfo.title).click();
    await page.locator('#actionSearch').click();
  
    // search for availability icon
    await page.locator('#list-view-button-button').click();
    await page.waitForTimeout(2000);
    await page.screenshot({
      path: `screenshots/WI_${testInfo.title}_${arrivalData.month}-${arrivalData.day}_${departureData.month}-${departureData.day}.png`, fullPage: true }
    );
    await expect(page.locator('#availability-0')).toBeVisible();
  });
  
  WISCONSIN_PARKS.forEach(park => {
    test(park, async () => {});
  });
});