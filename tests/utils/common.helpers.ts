export const dateData = (date: string) => {
  const dateObj = new Date(date);
  const month = dateObj.toLocaleString('default', { month: 'short', timeZone: 'UTC' });
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  return { month: month, day: day, year: year };
};