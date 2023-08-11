import { MouseEvent } from 'react';
import { Event } from '@/types';

interface EventTagProps {
  event: Event,
  isSelected?: boolean,
  onClick: (event: MouseEvent<HTMLButtonElement>) => void,
}

const EventTag = ({ event, isSelected=false, onClick }: EventTagProps) => {
  const classes = `
    ibs-event-tag
    ibs-category-${event.category_code.toLowerCase()}
    ${isSelected ?'selected' : ''}
  `;
  return (
    <button
      className={classes}
      onClick={onClick}
    >
      {event.name}
    </button>
  )
}

export default EventTag;