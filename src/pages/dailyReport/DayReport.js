import styles from './DayReport.module.css';
import DateHeader from './components/dailyReport/DateHeader';
import WeekCalendar from './components/dailyReport/WeekCalendar';
import { useState, useEffect } from 'react';

const DayReport = () => {
  const [currentDay, setCurrentDay] = useState(new Date());
  const [days, setDays] = useState(getWeekDaysByDate(new Date()))

  return (
    <div className={styles.dayReport}>
      <DateHeader date={currentDay.toISOString()} />
      <WeekCalendar days={days} />
    </div>
  )
}

export default DayReport;