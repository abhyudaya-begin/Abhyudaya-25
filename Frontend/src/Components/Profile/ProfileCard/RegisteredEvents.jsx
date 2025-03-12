import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IndianRupee } from "lucide-react";
import { removeEvent } from "../../Redux/EventSlice";
import { fetchEvents, moveProcessingToPending } from "../../Redux/EventThunks";

const RegisteredEvents = () => {
  const dispatch = useDispatch();
  const processingEvents = useSelector((state) => state.events.processing);
  const eventsPending = useSelector((state) => state.events.eventsPending);
  const eventsPaid = useSelector((state) => state.events.eventsPaid);
  const loading = useSelector((state) => state.events.status === "loading");

  // Handle "Pay Now"
  const handlePayNow = () => {
    if (processingEvents.length === 0) return;
    dispatch(moveProcessingToPending());
  };

  useEffect(() => {
    dispatch(fetchEvents());
  }, []);
  // Render Events
  const renderEventBox = (events, title, isProcessing = false) => (
    <div className="bg-white/10 p-4 sm:p-5 rounded-xl mt-4">
      <h3 className="text-lg sm:text-xl font-semibold text-white">{title}</h3>
      {events.length > 0 ? (
        <div className="space-y-2 sm:space-y-3 mt-2">
          {events.map((event) => (
            <div
              key={event.eventId}
              className="bg-white/10 p-2 sm:p-4 rounded-xl hover:bg-white/20 transition flex justify-between items-center"
            >
              <div className="flex items-center space-x-3">
                <h4 className="font-medium text-white text-sm sm:text-base">
                  {event.name}
                </h4>
                <div className="flex items-center bg-white/10 px-2 sm:px-3 py-1 rounded-full">
                  <IndianRupee className="w-4 h-4 text-indigo-300 mr-1" />
                  <span className="text-white font-medium text-xs sm:text-base">
                    {event.price}
                  </span>
                </div>
              </div>
              {isProcessing && (
                <button
                  onClick={() =>
                    dispatch(removeEvent({ eventId: event.eventId }))
                  }
                  className="bg-red-500 cursor-pointer hover:bg-red-600 text-white text-xs sm:text-sm px-3 py-1 rounded-lg"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white/50 text-sm mt-2">
          No {title.toLowerCase()} events.
        </p>
      )}
    </div>
  );

  return (
    <div className="w-full bg-white/10 rounded-2xl p-4 sm:p-5">
      <h2 className="text-base sm:text-xl font-bold text-white">
        Registered Events
      </h2>
      {/* Processing Events with Pay Now Button */}
      {renderEventBox(processingEvents, "Processing Events", true)}

      {processingEvents.length > 0 && (
        <button
          onClick={handlePayNow}
          className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm sm:text-base px-4 py-2 rounded-lg mt-3"
          disabled={loading}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      )}
      {/* Pending Events Grouped by Trxn ID */}

      {console.log(eventsPending)}

      {Object.entries(eventsPending || {}).map(([trxnId, events]) => {
        if (trxnId === undefined) {
          return null;
        }
        return (
          <div key={trxnId} className="mt-4">
            <h3 className="text-lg sm:text-xl font-semibold text-indigo-400">
              Pending for verification (Trxn ID: {trxnId})
            </h3>
            {renderEventBox(events || [], `Transaction ${trxnId}`)}
          </div>
        );
      })}

      {Object.entries(eventsPaid || {}).map(([trxnId, events]) => (
        <div key={trxnId} className="mt-4">
          <h3 className="text-lg sm:text-xl font-semibold text-green-400">
            Paid (Trxn ID: {trxnId})
          </h3>
          {renderEventBox(events || [], `Transaction ${trxnId}`)}
        </div>
      ))}
    </div>
  );
};

export default RegisteredEvents;
