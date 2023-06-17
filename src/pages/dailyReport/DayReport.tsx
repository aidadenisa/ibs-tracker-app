import styles from './DayReport.module.css';
import DateHeader from '../../components/dailyReport/DateHeader';
import WeekCalendar from '../../components/dailyReport/WeekCalendar';
import { getWeekDaysByDate } from '../../services/utils';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const DayReport = () => {

  const user = useSelector((state: RootState) => state.user);
  const [currentDay, setCurrentDay] = useState<Date>(new Date());
  const [days, setDays] = useState<string[]>(getWeekDaysByDate(new Date()));

  return (
    <div className={`day-report ${styles.dayReport}`}>
      <DateHeader date={currentDay.toISOString()} />
      <WeekCalendar days={days} />
      {JSON.stringify(user)}
    </div>
  )
}

export default DayReport;