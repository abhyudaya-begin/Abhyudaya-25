import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all events (pending & paid) from the backend
export const fetchEvents = createAsyncThunk("events/fetchEvents", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("/api/events");
    return response.data; // Expecting { eventsPending: {...}, eventsPaid: {...} }
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to fetch events");
  }
});

// Process payment: Send processing events and move them to pending
export const processPayment = createAsyncThunk(
  "events/processPayment",
  async ({ events }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/events/pay", { events });
      return response.data; // Expecting { trxnId, events }
    } catch (error) {
      return rejectWithValue(error.response?.data || "Payment processing failed");
    }
  }
);
