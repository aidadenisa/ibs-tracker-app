import { MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import { Event } from '../../types';
import styles from './EventsList.module.css';
import EventTag from './EventTag';
import { RootState } from '../../store';

interface EventsListProps {
  events: Event[]
}
const EventsList = ({ events }: EventsListProps) => {
  const selectedEventsIds = useSelector((state: RootState) => state.selectedEventsIds);

  const toggleSelectedEvent = (evt: MouseEvent<HTMLButtonElement>) => {

    console.log(evt);
  }


  return (
    <div className={styles.eventsList}>
      { events && events.length &&
        events.map(event => 
          <EventTag event={event} key={event.id} onClick={toggleSelectedEvent}/>
        )}
    </div>
  )
}

export default EventsList;