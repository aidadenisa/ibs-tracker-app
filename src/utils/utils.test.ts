import { removeDays } from './date';

describe('removeDays', () => {
  test('returns a date object', () => {
    const date = removeDays(new Date('2023-09-01'), 3);

    expect(date).toBeInstanceOf(Date);
  });

  test('removes a number of days correctly during the same year', () => {
    const firstDate = removeDays(new Date('2023-09-01'), 3);
    const middleDate = removeDays(new Date('2023-09-05'), 3);
    const lastDate = removeDays(new Date('2023-09-30'), 3);

    expect(firstDate.toISOString()).toMatch(/2023-08-29/);
    expect(middleDate.toISOString()).toMatch(/2023-09-02/);
    expect(lastDate.toISOString()).toMatch(/2023-09-27/);
  });

  test('removes a number of days correctly across different years', () => {
    const firstDate = removeDays(new Date('2023-01-01'), 2);

    expect(firstDate.toISOString()).toMatch(/2022-12-30/);
  });

  test('remove more than 356 days correctly', () => {
    const date1 = removeDays(new Date('2023-09-01'), 400);
    const date2 = removeDays(new Date('2023-09-15'), 40000);
    // const date3 = removeDays(new Date('2023-09-20'), 400000000);

    expect(date1.toISOString()).toMatch(/2022-07-28/);
    expect(date2.toISOString()).toMatch(/1914-03-11/);
  });

  test('remove negative days should add days', () => {
    const date1 = removeDays(new Date('2023-09-01'), -1);
    const date2 = removeDays(new Date('2023-09-01'), -200);

    expect(date1.toISOString()).toMatch(/2023-09-02/);
    expect(date2.toISOString()).toMatch(/2024-03-19/);
  });

  test('remove 0 days should return the same date', () => {
    const date1 = removeDays(new Date('2023-09-01'), 0);

    expect(date1.toISOString()).toMatch(/2023-09-01/);
  });
});
