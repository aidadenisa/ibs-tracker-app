const WeekCalendar = ({ days }) => {

  const formattedDate = (day) => {
    return (new Date(day)).getDate();
  }
  const formattedDayName = (day) => {
    return new Intl.DateTimeFormat('en-GB',{ weekday: "short" }).format(new Date(day));
  }

  return (
    <div className="flexbox">
      {days && days.length &&
        days.map(day => <div>
          <div>{formattedDate(day)}</div>
          <div>{formattedDayName(day)}</div>
          </div>)
      }
    </div>
  )
}

export default WeekCalendar;