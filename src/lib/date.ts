import { isSameDay, subDays, addDays as addDaysFns } from 'date-fns';

const areSameDays = (firstDate: Date | number, secondDate: Date | number) => {
  return isSameDay(firstDate, secondDate);
}

const substractDays = (date: Date | number, days: number) => {
  return subDays(date, days);
}

const addDays = (date: Date | number, days: number) => {
  return addDaysFns(date, days);
}

export {
  areSameDays,
  addDays,
  substractDays,
}

