import { getWeekDaysByDate } from '.'

describe('getWeekDaysByDate', () => {
  test('returns an array of 7 valid ISO dates', () => {
    const days = getWeekDaysByDate(new Date('2023-09-01'))

    expect(days).toHaveLength(7)
    for (let i = 0; i < days.length; i++) {
      expect(new Date(days[i]).toISOString()).toBe(days[i])
    }
  })

  test('returns the same week days for any day of the week', () => {
    const days1 = getWeekDaysByDate(new Date('2023-08-29')) //Tuesday
    const days2 = getWeekDaysByDate(new Date('2023-09-01')) //Friday
    const days3 = getWeekDaysByDate(new Date('2023-09-03')) //Sunday

    expect(days1).toStrictEqual(days2)
    expect(days2).toStrictEqual(days3)
  })

  test('returns different week days for days in different weeks', () => {
    const days = getWeekDaysByDate(new Date('2023-09-01'))
    const otherDays = getWeekDaysByDate(new Date('2023-09-04'))

    expect(days).not.toStrictEqual(otherDays)
  })

  test('returns same week for dates in separate years', () => {
    const days1 = getWeekDaysByDate(new Date('2022-12-31')) //2022 same week
    const days2 = getWeekDaysByDate(new Date('2023-01-01')) //2023 same week

    expect(days1).toStrictEqual(days2)
  })
})
