import { useDispatch, useSelector } from 'react-redux';
import { DetailedRecord } from '@/types';
import { RootState } from '@/store';
import { getFormattedDayName } from '@/features/weekCalendar/utils';
import { setCurrentDay } from '@/features/dayReport/reducers/currentDay';
import styles from '@/features/weekCalendar/components/styles/WeekCalendar.module.css';

import { useEffect, useMemo, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { getWeekDaysByDate } from '@/features/dayReport/utils';
import { addDays, areSameDays, substractDays, isFuture } from '@/lib/date';
import { format } from 'date-fns';

interface WeekCalendarProps {
  daysRecordsMap: Map<string, DetailedRecord[]>
}
type CategoryLine = {
  categoryCode: string
  isVisible: boolean
}
const WeekCalendar = ({ daysRecordsMap }: WeekCalendarProps) => {

  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.categories);
  const currentDay = useSelector((state: RootState) => state.currentDay);

  const [days, setDays] = useState<string[]>(getWeekDaysByDate(new Date(currentDay)));

  // useMemo to perform some expensive computation only when needed
  const categoriesToDisplay = useMemo(
    () => {
      const dayCategories = new Map<string, CategoryLine[]>();
      if (!daysRecordsMap || !daysRecordsMap.size) return dayCategories;
      const getRecordsByDay = (day: string): DetailedRecord[] => {
        return daysRecordsMap.get(format(new Date(day), 'yyyy-MM-dd')) || [] as DetailedRecord[]
      }
      for (let i = 0; i < days.length; i++) {
        const categoryCodes = getRecordsByDay(days[i])
          .map(record => record.eventDetails)
          .map(event => event.category_code)
        const codesSet = new Set(categoryCodes)
        dayCategories.set(
          days[i], 
          categories.map(
            category => ({ 
              categoryCode: category.code, 
              isVisible: codesSet.has(category.code) 
            })
          )
        )
      }
      return dayCategories;
    },
    [days, daysRecordsMap]
  );

  useEffect(() => {
    setDays(getWeekDaysByDate(new Date(currentDay)));
  }, [currentDay])

  const swipeHandlers = useSwipeable({
    onSwipedLeft: (eventData) => dispatch(setCurrentDay(
      addDays(new Date(currentDay), 7).toISOString()
    )),
    onSwipedRight: (eventData) => dispatch(setCurrentDay(
      substractDays(new Date(currentDay), 7).toISOString()
    )),
  });

  const formattedDate = (day: string): number => {
    return (new Date(day)).getDate();
  }

  const isCurrentDayClass = (day: string) => {
    return areSameDays(new Date(day), new Date(currentDay))
      ? styles.selected
      : '';
  }

  const getCategoryStyles = (category: CategoryLine) => {
    return `
      week-calendar__category 
      ${category.isVisible && `ibs-category-${category.categoryCode.toLowerCase()}-accent`}
      ${styles.categoryLine}`
  }

  const handleChangeDay = (day: string) => {
    dispatch(setCurrentDay(day));
  }

  const isInFuture = (day: string) => {
    return isFuture(new Date(day)) ? styles.isFutureDate : ''
  }

  const isToday = (day: string) => {
    return areSameDays(new Date(day), new Date()) ? styles.isToday : ''
  }

  return (
    <div className={`flexbox week-calendar ${styles.weekCalendar}`} {...swipeHandlers}>
      {days && days.length &&
        days.map((day, index) =>
          <div
            className={`${styles.slot} ${isCurrentDayClass(day)} ${isInFuture(day)} ${isToday(day)}`}
            key={index}
            onClick={() => handleChangeDay(day)}
          >
            <div className={`week-calendar__day ${styles.weekCalendarDay}`}>
              {formattedDate(day)}
            </div>
            <div className={`week-calendar__day-name ${styles.weekCalendarDayName}`}>{getFormattedDayName(day)}</div>
            {
              categoriesToDisplay.has(day) && categoriesToDisplay.get(day)?.map(category =>
                <div
                  className={getCategoryStyles(category)}
                  key={`${category.categoryCode}-${day}`}
                ></div>
              )
            }
          </div>)
      }
    </div>
  )
}

export default WeekCalendar;