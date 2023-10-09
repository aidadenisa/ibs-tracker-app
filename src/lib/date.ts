import { isSameDay, subDays, addDays as addDaysFns, format, isFuture as isFutureFns } from 'date-fns';

const areSameDays = (firstDate: Date | number, secondDate: Date | number) => {
  return isSameDay(firstDate, secondDate);
}

const substractDays = (date: Date | number, days: number) => {
  return subDays(date, days);
}

const addDays = (date: Date | number, days: number) => {
  return addDaysFns(date, days);
}

const formatDate = (date: Date | number, formatString: string) => {
  return format(date, formatString);
}

const isFuture = (date: Date | number ) => {
  return isFutureFns(date);
}

export {
  areSameDays,
  addDays,
  substractDays,
  formatDate,
  isFuture
}

