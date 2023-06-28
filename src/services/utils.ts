import { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { endOfDay, isSameDay, startOfDay } from 'date-fns';

const getRequestConfig = (): AxiosRequestConfig => {
  const headers: AxiosRequestHeaders = {} as AxiosRequestHeaders;
  const token = localStorage.getItem('token');
  if(token) {
    headers.Authorization = `Bearer ${token}` 
  } 
  return { headers };
}

const removeDays = (currentDay: Date, numberOfDays: number): Date => {
  const dateOffset = (24*60*60*1000) * numberOfDays; 
  const newDate = new Date();
  newDate.setTime(currentDay.getTime() - dateOffset);
  return newDate;
}

const getWeekDaysByDate = (current: Date): string[] => {
  const oneDayOffset = 24*60*60*1000; 

  // getDay gives the index corresponding to the day of the week: 0-Sunday, 6-Saturday
  const dateIndexInTheWeek = current.getDay() === 0 //if it's Sunday
    ? 6 // make the index 6
    : current.getDay() - 1; // we want to use 0-Monday

  // getTime offers the time in milliseconds
  const firstDayOfTheWeek = current.getTime() - oneDayOffset * dateIndexInTheWeek;
  
  const days:string[] = [];
  for (let i = 0; i < 7; i++) {
    days.push(new Date(firstDayOfTheWeek + oneDayOffset * i).toISOString());
  }
  return days;
}

const getMonthName = (dateISOString: string): string => {
  const date = new Date(dateISOString);
  return new Intl.DateTimeFormat('en-GB', { month : 'long' }).format(date);
}

const getFormattedDayName = (day: string): string => {
  return new Intl.DateTimeFormat('en-GB', { weekday: 'short' }).format(new Date(day));
}

const areSameDays = (firstDate: Date | number, secondDate: Date | number) => {
  return isSameDay(firstDate, secondDate);
}

export {
  getWeekDaysByDate,
  removeDays,
  getRequestConfig,
  getMonthName,
  getFormattedDayName,
  areSameDays
}