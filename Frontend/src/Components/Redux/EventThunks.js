import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { moveToPending } from "./EventSlice";
import { logout } from "./UserSlice"; // Import the logout action
import toast from "react-hot-toast";

// ✅ Fetch all events (Handle expired token)
export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API_URL}users/fetchEvents`,
        {
          withCredentials: true, // Ensures cookies are sent
        }
      );
      console.log(response.data);

      return { events: response.data }; // ✅ Wrap data inside `events`
    } catch (error) {
      console.log(error);

      // Handle expired token (401 Unauthorized)
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        dispatch(logout()); // Dispatch logout action
        window.location.reload();

      }

      return rejectWithValue(error.response?.data || "Failed to fetch events");
    }
  }
);

// ✅ Move Processing Events to Pending (Handle expired token)
export const moveProcessingToPending = createAsyncThunk(
  "events/moveProcessingToPending",
  async (transactionId, { getState, dispatch, rejectWithValue }) => {
    try {
      const state = getState();
      const processingEvents = state.events.processing;

      if (!processingEvents.length) {
        return rejectWithValue({ message: "No events in processing!" });
      }

      const trxnId = transactionId.trxnId;

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}users/eventRegister`,
        { trxnId, events: processingEvents },
        {
          withCredentials: true, // Sends cookies to backend
        }
      );

      dispatch(moveToPending({ trxnId, events: processingEvents }));
      toast.success("Payment done!");

      return response.data; // { trxnId, events }
    } catch (error) {
      console.log(error);
      
      // Handle expired token (401 Unauthorized)
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        dispatch(logout()); // Dispatch logout action
      }

      toast.error("Error processing payment.");
      return rejectWithValue(
        error.response?.data || { message: "Something went wrong!" }
      );
    }
  }
);
