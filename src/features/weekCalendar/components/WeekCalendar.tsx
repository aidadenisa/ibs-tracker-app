import { useDispatch, useSelector } from 'react-redux';
import { Category } from '@/types';
import { RootState } from '@/store';
import { getFormattedDayName } from '@/features/weekCalendar/utils';
import { setCurrentDay } from '@/features/dayReport/reducers/currentDay';
import styles from '@/features/weekCalendar/components/styles/WeekCalendar.module.css';

// TODO: think better about how to achieve this without coupling this service here
import recordService from '@/features/records/services/records';
import { useEffect, useMemo, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { getWeekDaysByDate } from '@/features/dayReport/utils';
import { addDays, areSameDays, substractDays, isFuture } from '@/lib/date';

const WeekCalendar = () => {

  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.categories);
  const currentDay = useSelector((state: RootState) => state.currentDay);
  const records = useSelector((state: RootState) => state.records);

  const [days, setDays] = useState<string[]>(getWeekDaysByDate(new Date(currentDay)));

  // useMemo to perform some expensive computation only when needed
  const categoriesToDisplay = useMemo(
    () => {
      const dayCategories = new Map<string, Category[]>();
      if (!categories || !categories.length || !records || !records.length) return dayCategories;

      for (let i = 0; i < days.length; i++) {
        dayCategories.set(days[i], recordService.populateUserRecords(records, categories, new Date(days[i])))
      }
      return dayCategories;
    },
    [days, categories, records]
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

  const getCategoryClassname = (category: Category) => {
    return `
      week-calendar__category 
      ${category.events.length && `ibs-category-${category.code.toLowerCase()}-inverted`}
      ${styles.categoryLine}`
  }

  const handleChangeDay = (day: string) => {
    dispatch(setCurrentDay(day));
    recordService.updateRecordsForCurrentDay(records);
  }

  const isInFuture = (day: string) => {
    return isFuture(new Date(day)) 
      ? styles.isFutureDate
      : ''
  }

  return (
    <div className={`flexbox week-calendar ${styles.weekCalendar}`} {...swipeHandlers}>
      {days && days.length &&
        days.map((day, index) =>
          <div
            className={`${styles.slot} ${isCurrentDayClass(day)} ${isInFuture(day)}`}
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
                  className={getCategoryClassname(category)}
                  key={category.id}
                ></div>
              )
            }
          </div>)
      }
    </div>
  )
}

export default WeekCalendar;