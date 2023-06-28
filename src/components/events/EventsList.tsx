import { MouseEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Event } from '../../types';
import styles from './EventsList.module.css';
import EventTag from './EventTag';
import { RootState } from '../../store';
import { toggleEventSelectedState } from '../../reducers/events';
import { Dictionary } from '@reduxjs/toolkit';

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