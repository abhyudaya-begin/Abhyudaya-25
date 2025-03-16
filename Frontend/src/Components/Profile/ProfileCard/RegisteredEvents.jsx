import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IndianRupee } from "lucide-react";
import { removeEvent } from "../../Redux/EventSlice";
import { fetchEvents, moveProcessingToPending } from "../../Redux/EventThunks";
import PaymentModal from "./PaymentModal";

const RegisteredEvents = () => {
  const dispatch = useDispatch();
  const processingEvents = useSelector((state) => state.events.processing);
  const eventsPending = useSelector((state) => state.events.eventsPending);
  const eventsPaid = useSelector((state) => state.events.eventsPaid);
  const loading = useSelector((state) => state.events.status === "loading");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  // Calculate total amount for processing events
  useEffect(() => {
    const total = processingEvents.reduce((sum, event) => sum + (event?.price || 0), 0);
    // Round up to nearest 50
    setTotalAmount(total);
  }, [processingEvents]);

  // Handle "Pay Now" click
  const handlePayNow = () => {
    if (processingEvents.length === 0) return;
    setIsModalOpen(true);
  };

  // Handle Payment Submission
  const handleSubmitPayment = async (transactionId) => {
    
    if (!transactionId.trim()) return;
    dispatch(
      moveProcessingToPending({
        trxnId: transactionId,
        events: processingEvents,
      })
    );
    setIsModalOpen(false);
  };

  // Render event boxes
  const renderEventBox = (events, title, currentState = 1) => (
    <div
      className={`bg-white/10 p-4 sm:p-5 rounded-xl mt-4 ${
        currentState === 1
          ? "bg-yellow-900/20"
          : currentState === 2
          ? "bg-green-800/20"
          : ""
      }`}
    >
      <h3
        className={`text-lg sm:text-xl font-semibold text-white ${
          currentState === 1
            ? "text-yellow-400"
            : currentState === 2
            ? "text-green-600"
            : ""
        }`}
      >
        {title}
      </h3>
      <h5> {currentState === 1 && "Pending for Verification!"}</h5>
      <h5> {currentState === 2 && "Payment Approved!"}</h5>

      {events.length > 0 ? (
        <div className="space-y-2 sm:space-y-3 mt-2">
          {events.map((event) => (
            <div
              key={event?.eventId}
              className="bg-white/10 p-2 cursor-pointer sm:p-4 rounded-xl hover:bg-white/20 transition flex justify-between items-center gap-8"
            >
              <div className="flex items-center w-full justify-between space-x-3">
                <h4 className="font-medium text-white text-sm sm:text-base">
                  {event?.name}
                </h4>
                <div className="flex items-center bg-white/10 px-2 sm:px-3 py-1 rounded-full">
                  <IndianRupee className="w-4 h-4 text-indigo-300 mr-1" />
                  <span className="text-white font-medium text-xs sm:text-base">
                    {event?.price}
                  </span>
                </div>
              </div>
              {currentState === 0 && (
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
      {renderEventBox(processingEvents, "Processing Events", 0)}

      {processingEvents.length > 0 && (
        <>
          <div className="text-white font-medium mt-2">
            Total Amount: ₹{totalAmount}
          </div>
          <button
            onClick={handlePayNow}
            className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm sm:text-base px-4 py-2 rounded-lg mt-3 w-full cursor-pointer"
            disabled={loading}
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </>
      )}

      {/* Pending Events Grouped by Trxn ID */}
      {Object.entries(eventsPending || {}).map(([trxnId, events]) => (
        <div key={trxnId} className="mt-4">
          {renderEventBox(events || [], `Transaction ${trxnId}`, 1)}
        </div>
      ))}

      {/* Paid Events Grouped by Trxn ID */}
      {Object.entries(eventsPaid || {}).map(([trxnId, events]) => (
        <div key={trxnId} className="mt-4">
          <h3 className="text-lg sm:text-xl font-semibold text-green-400">
            Paid (Trxn ID: {trxnId})
          </h3>
          {renderEventBox(events || [], `Transaction ${trxnId}`, 2)}
        </div>
      ))}

      {/* Payment Modal */}
      {isModalOpen && (
        <PaymentModal
          amount={totalAmount} // Pass total amount to modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmitPayment}
        />
      )}
    </div>
  );
};

export default RegisteredEvents;
