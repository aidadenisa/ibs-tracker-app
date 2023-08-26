import { Dictionary, PayloadAction, createSlice } from '@reduxjs/toolkit';

const eventsSlice = createSlice({
  name: 'selectedEventsIds',
  initialState: {} as Dictionary<boolean>,
  reducers: {
    setSelectedEventsIds(state, action: PayloadAction<Dictionary<boolean>>) {
      return action.payload;
    },
    selectEvent(state, action: PayloadAction<string>) {
      const newState = JSON.parse(JSON.stringify(state));
      newState[action.payload] = true;
      return newState;
    }, 
    unselectEvent(state, action: PayloadAction<string>) {
      const newState = JSON.parse(JSON.stringify(state));
      newState[action.payload] = false;
      return newState;
    },
    toggleEventSelectedState(state, action: PayloadAction<string>) {
      const newState = JSON.parse(JSON.stringify(state));
      const eventId = action.payload;
      if(newState[eventId] === undefined) {
        newState[eventId] = true;
        return newState;
      }
      newState[eventId] = !newState[eventId];
      return newState;
    },
    bulkUpdateEvents(state, action: PayloadAction<Dictionary<boolean>>) {
      const newState = JSON.parse(JSON.stringify(state));
      const eventIds = Object.keys(action.payload);

      for( let i=0; i < eventIds.length; i++ ) {
        newState[eventIds[i]] = action.payload[eventIds[i]];
      }
      
      return newState;
    }
  }

});

export const { 
  setSelectedEventsIds, 
  selectEvent, 
  unselectEvent,
  toggleEventSelectedState,
  bulkUpdateEvents,
} = eventsSlice.actions;
export default eventsSlice.reducer;