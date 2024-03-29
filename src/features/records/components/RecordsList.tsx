import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import recordService from '@/features/records/services/records';
import CategorySection from '@/features/records/components/CategorySection';
import EventsList from '@/features/records/components/EventsList';
import { useMemo } from 'react';

interface RecordsListProps {
  date: string
}

const RecordsList = ({ date }: RecordsListProps) => {

  const categories = useSelector((state: RootState) => state.categories);
  const records = useSelector((state: RootState) => state.records);

  // useMemo to perform some expensive computation only when needed
  const categorizedRecords = useMemo(
    () => recordService.populateUserRecords(records, categories, new Date(date)),
    [ date, records, categories ]
  );

  return (
    <div className="ibs-records-list">
      {categorizedRecords && categorizedRecords.length &&
        categorizedRecords.map(category => (
          <div key={category.id}>
            {
              category.events && !!category.events.length &&
              <CategorySection category={category}>
                {
                  category.events && !!category.events.length
                  && <EventsList events={category.events} />
                }
              </CategorySection>
            }
          </div>
        ))
      }
    </div >
  )
}

export default RecordsList;