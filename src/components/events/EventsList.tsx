import { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Event } from '../../types';
import styles from './EventsList.module.css';
import EventTag from './EventTag';
import { RootState } from '../../store';
import { toggleEventSelectedState } from '../../reducers/events';

interface EventsListProps {
  events: Event[]
}
const EventsList = ({ events }: EventsListProps) => {
  const dispatch = useDispatch();
  const selectedEventsIds = useSelector((state: RootState) => state.selectedEventsIds);

  return (
    <div className={styles.eventsList}>
      {events && events.length &&
        events.map(event =>
          <EventTag
            event={event}
            key={event.id}
            isSelected={selectedEventsIds[event.id]}
            onClick={() => dispatch(toggleEventSelectedState(event.id))}
          />
        )}
    </div>
  )
}

export default EventsList;