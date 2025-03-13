import { createSlice } from "@reduxjs/toolkit";
import { fetchEvents, moveProcessingToPending } from "./EventThunks";
import toast from "react-hot-toast";

// Helper function to check if an event already exists in the processing list
const eventExists = (events, eventId) => {
  return events.some((event) => event.eventId === eventId);
};

const eventsSlice = createSlice({
  name: "events",
  initialState: {
    processing: [], // New events before registration
    eventsPending: null, // { trxnId: { all events data } }
    eventsPaid: null, // { trxnId: { all events data } }
    status: "idle",
    error: null,
  },
  reducers: {
    addEvent: (state, action) => {
      if (!eventExists(state.processing, action.payload.eventId)) {
        state.processing.push(action.payload);
        toast.success("Event added to the wishlist!");
      } else {
        toast.error("Already registered!");
      }
    },

    removeEvent: (state, action) => {
      state.processing = state.processing.filter(
        (event) => event.eventId !== action.payload.eventId
      );
    },

    moveToPending: (state, action) => {
      const { trxnId, events } = action.payload;
      state.eventsPending = {  [trxnId]: events , ...state.eventsPending}; // ✅ Merging instead of overwriting
      state.processing = [];
    },

    updateEventStatus: (state, action) => {
      const { trxnId, status } = action.payload;

      if (status === "Paid") {
        state.eventsPaid = {
          
          [trxnId]: state.eventsPending[trxnId],...state.eventsPaid
        };
        delete state.eventsPending[trxnId];
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.eventsPending = action.payload.events.eventsPending; // ✅ Now properly nested
        state.eventsPaid = action.payload.events.eventsPaid;
      })

      .addCase(moveProcessingToPending.fulfilled, (state, action) => {
        const { trxnId, events } = action.payload;
        state.eventsPending = { ...state.eventsPending, [trxnId]: events }; // ✅ Merging with existing
        state.processing = [];
      });
  },
});

export const { addEvent, removeEvent, moveToPending, updateEventStatus } =
  eventsSlice.actions;
export default eventsSlice.reducer;
