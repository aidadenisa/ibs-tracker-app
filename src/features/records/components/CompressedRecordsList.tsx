import EventsList from '@/features/records/components/EventsList';
import { DetailedRecord } from '@/types';

interface CompressedRecordsListProps {
  records: DetailedRecord[]
}

const CompressedRecordsList = ({ records }: CompressedRecordsListProps) => {

  const events = records
    .map(record => record.eventDetails)
    .sort((a, b) => a.category_code > b.category_code ? -1 : 1)

  return (
    <div className="ibs-records-compressed-list">
      { records && !!records.length && events && !!events.length
        && <EventsList events={events} /> }
    </div >
  )
}

export default CompressedRecordsList;