import { useDispatch } from 'react-redux';
import { Dictionary } from '@reduxjs/toolkit';
import { Event } from '@/types';
import styles from '@/features/records/components/styles/EventsList.module.css';
import EventTag from '@/features/records/components/EventTag';
import { bulkUpdateEvents, toggleEventSelectedState } from '@/features/records/reducers/events';

interface EventsListProps {
  events: Event[],
  canInteract?: boolean,
  selectedEventsIds?: Dictionary<boolean>,
  isSingleChoice?: boolean
}
const EventsList = ({ events, canInteract=false, selectedEventsIds, isSingleChoice = false }: EventsListProps) => {
  const dispatch = useDispatch();

  const isSelected = (eventId: string) => {
    return (canInteract && selectedEventsIds && selectedEventsIds[eventId]) || !canInteract;
  }

  const handleClick = (eventId: string) => {
    if(!canInteract) return;
    if(isSingleChoice) {
      const updatedEvents:Dictionary<boolean> = {};
      events.forEach(event => {
        updatedEvents[event.id] = false;
      })
      updatedEvents[eventId] = !isSelected(eventId);
      dispatch(bulkUpdateEvents(updatedEvents))
    } else {
      dispatch(toggleEventSelectedState(eventId))
    }
  }

  return (
    <div className={styles.eventsList}>
      {events && events.length &&
        events.map(event =>
          <div className={styles.eventTag} key={event.id}>
            <EventTag
              event={event}
              isSelected={isSelected(event.id)}
              onClick={() => handleClick(event.id)}
            />
          </div>
        )}
    </div>
  )
}

export default EventsList;