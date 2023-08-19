import { isSameDay } from 'date-fns';

const areSameDays = (firstDate: Date | number, secondDate: Date | number) => {
  return isSameDay(firstDate, secondDate);
}
export {
  areSameDays,
}

