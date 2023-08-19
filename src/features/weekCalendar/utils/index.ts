const getFormattedDayName = (day: string): string => {
  return new Intl.DateTimeFormat('en-GB', { weekday: 'short' }).format(new Date(day));
}

export {
  getFormattedDayName
}