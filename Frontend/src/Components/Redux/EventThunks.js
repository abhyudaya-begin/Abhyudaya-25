import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { moveToPending } from "./EventSlice";
import toast from "react-hot-toast";

// ✅ Fetch all events (pending & paid)
export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API_URL}users/fetchEvents`,
        {
          withCredentials: true, // Ensures cookies are sent
        }
      );
      console.log(response);

      return response.data; // Expecting { eventsPending: {...}, eventsPaid: {...} }
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data || "Failed to fetch events");
    }
  }
);

// ✅ Move Processing Events to Pending (Register Events)
export const moveProcessingToPending = createAsyncThunk(
  "events/moveProcessingToPending",
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const state = getState();
      const processingEvents = state.events.processing;

      if (!processingEvents.length) {
        return rejectWithValue({ message: "No events in processing!" });
      }

      const trxnId = `TRXN_${Date.now()}`; // Generate a transaction ID

      // Send only event IDs, not full objects
      // const eventIds = processingEvents.map(event => event.eventId);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}users/eventRegister`,
        { trxnId, events: processingEvents },
        {
          withCredentials: true, // This sends cookies to backend
        }
      );

      // Dispatch moveToPending to update Redux state
      dispatch(moveToPending({ trxnId, events: processingEvents }));
      toast.success("Done");

      return response.data; // { trxnId, events }
    } catch (error) {
      toast.error("Error");
      console.log(error);
      return rejectWithValue(
        error.response?.data || { message: "Something went wrong!" }
      );
    }
  }
);
