import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { RootState } from '@/store';

import DateHeader from '@/features/weekCalendar/components/DateHeader';
import WeekCalendar from '@/features/weekCalendar/components/WeekCalendar';
import DailyActionBar from '@/features/records/components/DailyActionBar';
import AddNewRecordModal from '@/features/records/components/AddNewRecordModal';
import CompressedRecordsList from '@/features/records/components/CompressedRecordsList';
import Section from '@/components/Section';

import categoryService from '@/features/records/services/categories';
import { setCategories } from '@/features/records/reducers/categories';
import recordService from '@/features/records/services/records'

import styles from '@/features/dayReport/components/styles/DayReport.module.css';

const DayReport = () => {

  const dispatch = useDispatch();

  const categories = useSelector((state: RootState) => state.categories);
  const currentDay = useSelector((state: RootState) => state.currentDay);
  const records = useSelector((state: RootState) => state.records);

  const [showAddNewRecordModal, setShowAddNewRecordModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true)

  const getRecordsByDay = (day: string) => {
    return daysRecordsMap.get(format(new Date(day), 'yyyy-MM-dd')) || []
  }

  useEffect(() => {
    const fetchCategories = async () => {
      if (!categories || (categories && !categories.length)) {
        setLoading(true)
        const categories = await categoryService.getCategoriesWithEvents();
        dispatch(setCategories(categories));
        setLoading(false)
      }
    }
    fetchCategories();
  }, []);

  // useMemo to perform some expensive computation only when needed
  const daysRecordsMap = useMemo(
    () => recordService.matchRecordsToDays(records),
    [records]
  );

  const currentDayRecords = useMemo(
    () => getRecordsByDay(currentDay),
    [currentDay, daysRecordsMap]
  )

  useEffect(() => {
    recordService.updateRecordsForCurrentDay(currentDayRecords);
  }, [currentDay])

  const handleAddRecordClick = () => {
    recordService.updateRecordsForCurrentDay(currentDayRecords)
    setShowAddNewRecordModal(true);
  }
  const handleCloseModalClick = () => {
    setShowAddNewRecordModal(false);
  }
  return (
    <>
      {!loading &&
        <div className={`day-report ${styles.dayReport}`}>
          {showAddNewRecordModal &&
            <AddNewRecordModal
              categories={categories}
              onClose={handleCloseModalClick}
            />
          }
          <DateHeader date={currentDay} />
          {/* <WeekCalendar onChangeCurrentDate={handleChangeCurrentDate}/> */}
          <WeekCalendar daysRecordsMap={daysRecordsMap} />
          <Section title="Today's records">
            {currentDayRecords && <CompressedRecordsList records={currentDayRecords} />}
          </Section>
          <DailyActionBar onAddRecord={handleAddRecordClick} />
        </div>
      }
      {loading && <h2>Loading...</h2>}
    </>

  )
}

export default DayReport;