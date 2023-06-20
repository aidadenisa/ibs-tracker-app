import { MouseEvent } from 'react';
import { Event } from '../../types';

interface EventTagProps {
  event: Event,
  selected?: boolean,
  onClick: (event: MouseEvent<HTMLButtonElement>) => void,
}

const EventTag = ({ event, selected=false, onClick }: EventTagProps) => {
  return (
    <button
      onClick={onClick}
    >
      {event.name}
    </button>
  )
}

export default EventTag;