const removeDays = (currentDay: Date, numberOfDays: number): Date => {
  const dateOffset = (24*60*60*1000) * numberOfDays; 
  const newDate = new Date();
  newDate.setTime(currentDay.getTime() - dateOffset);
  return newDate;
}

const getMonthName = (dateISOString: string): string => {
  const date = new Date(dateISOString);
  return new Intl.DateTimeFormat('en-GB', { month : 'long' }).format(date);
}

export {
  removeDays,
  getMonthName,
}