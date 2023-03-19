import { Page } from '@playwright/test';
import { SEARCH_PARAMS } from './constants';

const { PARTY_SIZE } = SEARCH_PARAMS;

export const fillSearchForm = async (page: Page, arrivalData, currentData, departureData) => {
  // begin trip date selection
  await page.locator('#mat-date-range-input-0').click();
  await page.locator('#monthDropdownPicker').click();

  // select year
  while (arrivalData.year > currentData.year) {
    await page.locator('#nextYearButton').click();
  }

  // select arrival month and day
  await page.getByRole('gridcell', { name: `${arrivalData.month} ${arrivalData.year}` }).click();
  await page.getByText(arrivalData.day.toString(), { exact: true }).click();
  
  // select departure month and day
  await page.locator('#monthDropdownPicker').click();
  await page.getByRole('gridcell', { name: `${departureData.month} ${departureData.year}` }).click();
  await page.getByText(departureData.day.toString(), { exact: true }).click();
  
  // select party size
  await page.getByLabel('Party Size').fill(PARTY_SIZE);

  // select equipment
  await page.locator('#equipment-field div').first().click();
  await page.getByRole('option', { name: new RegExp('^Tent') }).click();
};
