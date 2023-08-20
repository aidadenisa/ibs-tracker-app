import { Dictionary } from '@reduxjs/toolkit';
import api from '@/lib/api';
import store from '@/store';
import { API_URL } from '@/config';
import { Record, Category } from '@/types';
import { NewRecord } from '@/features/records/types';
import { areSameDays } from '@/features/records/utils';
import { setSelectedEventsIds } from '@/features/records/reducers/events';
import { setRecords } from '@/features/records/reducers/records';

const BASE_URL = API_URL + '/records';

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

  const result = await api.post(`${BASE_URL}/multiple`, {
    dateISO: currentDay,
    selectedEventsIds: Object.keys(selectedEventsIds).filter(key => selectedEventsIds[key])
  });

  return result;
}

const updateRecordsForCurrentDay = (records: Record[]) => {
  const currentDay = store.getState().currentDay;

  const selectedEventsIdsArray = records && !!records.length
    ? records.filter(
      record => areSameDays(new Date(record.date), new Date(currentDay))
    ).map(record => record.event)
    : [];
  const selectedEventsIds: Dictionary<boolean> = {};
  for (let i = 0; i < selectedEventsIdsArray.length; i++) {
    selectedEventsIds[selectedEventsIdsArray[i]] = true
  }
  store.dispatch(setSelectedEventsIds(selectedEventsIds));
}


const populateUserRecords = (records: Record[], categories: Category[], date: Date ): Category[] => {
  // category > record > event

  // get event ids of the records saved on this specific date
  const activeRecordsEventsIds = records.filter(record => 
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

const updateRecordsState = (records: Record[]) => {
  store.dispatch(setRecords(records));
  updateRecordsForCurrentDay(records);
}

const refreshRecords = async () => {
  try {
    const result = await api.get(`${API_URL}/users/currentUser?populate=true`)
    if(result && result.data && result.data.records) {
      updateRecordsState(result.data.records)
      return result.data.records;
    }
    return;
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
}