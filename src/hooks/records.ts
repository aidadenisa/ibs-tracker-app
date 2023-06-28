import { areSameDays } from '../services/utils';
import { Category, User } from '../types';

const usePopulateUserRecords = (user: User, categories: Category[], date: Date ): Category[] => {
  // category > record > event

  // get event ids of the records saved on this specific date
  const activeRecordsEventsIds = user.records.filter(record => 
    areSameDays(new Date(record.date), date)
  ).map(record => record.event);

  // create a new array of categories that only contain event information 
  // for the event ids filtered above
  const currentCategoryAndEvents: Category[] = [];

  for(let i = 0; i < categories.length; i++ ) {
    if(categories[i] && categories[i].events) {
      const selectedEvents = categories[i].events.filter(event => activeRecordsEventsIds.indexOf(event.id) > -1)
      currentCategoryAndEvents.push({
        ...categories[i],
        events: selectedEvents
      })
    }
  }

  return currentCategoryAndEvents
}

export {
  usePopulateUserRecords
}