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
    }
  }

});

export const { 
  setSelectedEventsIds, 
  selectEvent, 
  unselectEvent,
  toggleEventSelectedState
} = eventsSlice.actions;
export default eventsSlice.reducer;