import { createSlice } from "@reduxjs/toolkit";

const eventsSlice = createSlice({
  name: "events",
  initialState: { events: [] }, // Ensure events starts as an array
  reducers: {
    addEvent: (state, action) => {
      if (!Array.isArray(state.events)) {
        state.events = []; // Ensure it's always an array
      }
      state.events.push(action.payload); // Append new event to array
    },
    updateEvent: (state, action) => {
      const index = state.events.findIndex(event => event.id === action.payload.id);
      if (index !== -1) {
        state.events[index] = action.payload;
      }
    },
    removeEvent: (state, action) => {
      state.events = state.events.filter(event => event.id !== action.payload);
    },
  },
});

export const { addEvent, updateEvent, removeEvent } = eventsSlice.actions;
export default eventsSlice.reducer;

