import { Dictionary } from '@reduxjs/toolkit';
import api from '@/lib/api';
import store from '@/store';
import { Record, Category, DetailedRecord, Event, User } from '@/types';
import { NewRecord } from '@/features/records/types';
import { areSameDays, formatDate } from '@/lib/date';
import { setSelectedEventsIds } from '@/features/records/reducers/events';
import { setRecords } from '@/features/records/reducers/records';
import categoriesService from '@/features/records/services/categories';

const BASE_URL = '/records';

const getRecords = async (id: string): Promise<Record[]> => {
  return (await api.get(`${BASE_URL}/${id}`)).data;
}

const createRecord = async (newRecord: NewRecord) => {
  return (await api.post(BASE_URL, newRecord)).data;
}

const saveNewRecords = async () => {
  const { selectedEventsIds } = store.getState();
  if(selectedEventsIds === undefined || Object.keys(selectedEventsIds).length === 0) {
    return;
  }
  
  const { currentDay } = store.getState();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const result = await api.post(`${BASE_URL}/multiple`, {
    dateInfo: {
      dayYMD: formatDate(new Date(currentDay), 'yyyy-MM-dd'),
      timezone: timezone,
    },
    selectedEventsIds: Object.keys(selectedEventsIds).filter(key => selectedEventsIds[key])
  });

  return result;
}

const updateRecordsForCurrentDay = (records: Record[]) => {
  const currentDay = store.getState().currentDay;

  const selectedEventsIdsArray = records && !!records.length
    ? records.filter(
      record => areSameDays(new Date(record.day), new Date(currentDay))
    ).map(record => record.event)
    : [];
  const selectedEventsIds: Dictionary<boolean> = {};
  for (let i = 0; i < selectedEventsIdsArray.length; i++) {
    selectedEventsIds[selectedEventsIdsArray[i]] = true
  }
  store.dispatch(setSelectedEventsIds(selectedEventsIds));
}

// TODO: REMOVE OR CHANGE THIS IF NEEDED, ONLY USED IN RECORDSLIST
const populateUserRecords = (records: DetailedRecord[], categories: Category[], date: Date ): Category[] => {
  // category > record > event

  const recordsOnSpecificDate = records.filter(record => areSameDays(new Date(record.day), date))

  // get event ids of the records saved on this specific date
  const activeRecordsEventsIds = recordsOnSpecificDate.map(record => record.event) || []

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

const matchRecordsToDays = (records: DetailedRecord[]) => {
  const daysWithRecords = records.map(record => record.day)
  const daysToRecords = new Map<string, DetailedRecord[]>()
  for(let i=0; i<daysWithRecords.length; i++) {
    const recordsOnSpecificDate = records.filter(record => areSameDays(new Date(record.day), new Date(daysWithRecords[i])))
    daysToRecords.set(daysWithRecords[i], recordsOnSpecificDate)
  }
  return daysToRecords
}

const updateRecordsState = async (records: Record[], categories: Category[]) => {
  const events = new Map<string, Event>()
  for( let i=0; i<categories.length; i++) {
    for(let j=0; j<categories[i].events.length; j++) {
      events.set(categories[i].events[j].id, categories[i].events[j])
    }
  }
  const detailedRecords = [] as DetailedRecord[]

  for( let i=0; i<records.length; i++ ) {
    detailedRecords.push({
      ...records[i],
      eventDetails: events.get(records[i].event)
    } as DetailedRecord)    
  }
  store.dispatch(setRecords(detailedRecords));
  updateRecordsForCurrentDay(records);
}

const populateUserData = async (userData: User) => {
  const categories = await categoriesService.getCategoriesWithEvents()

  if(userData && userData.records) {
    updateRecordsState(userData.records, categories)
    return userData.records;
  }
}

const refreshRecords = async () => {
  try {
    const result = await api.get(`/users/currentUser?populate=true`)
    return await populateUserData(result.data);
  } catch (err) {
    throw new Error(`There has been a problem retrieving the records`);
  }
}

export default {
  getRecords, 
  createRecord,
  saveNewRecords,
  updateRecordsForCurrentDay,
  populateUserRecords,
  updateRecordsState,
  refreshRecords,
  populateUserData,
  matchRecordsToDays,
}