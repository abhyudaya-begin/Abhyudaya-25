import { createSlice } from "@reduxjs/toolkit";
import { fetchEvents, processPayment } from "./EventThunks";
import toast from "react-hot-toast";

// Helper function to check if an event already exists in the processing list
const eventExists = (events, eventId) => {
 
  return events.some((event) => event.eventId === eventId);
};

const eventsSlice = createSlice({
  name: "events",
  initialState: {
    processing: [], // New events before payment
    eventsPending: {}, // { trxnId: [eventIds] }
    eventsPaid: {}, // { trxnId: [eventIds] }
    status: "idle",
    error: null,
  },
  reducers: {
    addEvent: (state, action) => {
      if (!eventExists(state.processing, action.payload.eventId)) {
        state.processing.push(action.payload);
        toast.success("Event added to the wishlist!");
      } else {
        toast.error("Already registered !");
     
      }
    },

    removeEvent: (state, action) => {
      
      state.processing = state.processing.filter(
        (event) => event.eventId !== action.payload.eventId
      );
    },

    moveToPending: (state, action) => {
      const { trxnId, events } = action.payload;

      if (!state.eventsPending[trxnId]) {
        state.eventsPending[trxnId] = [];
      }
      state.eventsPending[trxnId].push(...events);

      // Remove processed events from `processing`
      state.processing = state.processing.filter(
        (event) => !events.includes(event.eventId)
      );
    },

    updateEventStatus: (state, action) => {
      const { trxnId, status } = action.payload;

      if (status === "Paid") {
        state.eventsPaid[trxnId] = state.eventsPending[trxnId];
        delete state.eventsPending[trxnId];
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.eventsPending = action.payload.eventsPending;
        state.eventsPaid = action.payload.eventsPaid;
        state.status = "succeeded";
      })
      .addCase(processPayment.fulfilled, (state, action) => {
        const { trxnId, events } = action.payload;
        state.eventsPending[trxnId] = events;
        state.processing = [];
      });
  },
});

export const { addEvent, removeEvent, moveToPending, updateEventStatus } =
  eventsSlice.actions;
export default eventsSlice.reducer;
