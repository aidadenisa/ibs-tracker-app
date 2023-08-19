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

export {
  getWeekDaysByDate
}