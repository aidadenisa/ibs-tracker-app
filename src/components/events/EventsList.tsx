import { useDispatch } from 'react-redux';
import { Dictionary } from '@reduxjs/toolkit';
import { Event } from '@/types';
import styles from '@/components/events/EventsList.module.css';
import EventTag from '@/components/events/EventTag';
import { toggleEventSelectedState } from '@/reducers/events';

interface EventsListProps {
  events: Event[],
  canInteract?: boolean,
  selectedEventsIds?: Dictionary<boolean>
}
const EventsList = ({ events, canInteract=false, selectedEventsIds }: EventsListProps) => {
  const dispatch = useDispatch();

  const isSelected = (eventId: string) => {
    return (canInteract && selectedEventsIds && selectedEventsIds[eventId]) || !canInteract;
  }

  const handleClick = (eventId: string) => {
    if(!canInteract) return;
    dispatch(toggleEventSelectedState(eventId))
  }

  return (
    <div className={styles.eventsList}>
      {events && events.length &&
        events.map(event =>
          <EventTag
            event={event}
            key={event.id}
            isSelected={isSelected(event.id)}
            onClick={() => handleClick(event.id)}
          />
        )}
    </div>
  )
}

export default EventsList;