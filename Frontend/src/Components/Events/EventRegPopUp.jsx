import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const EventRegPopUp = ({ isOpen, onClose, onSuccess, event }) => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [name] = useState(user.fullName || "");

  useEffect(() => {
    if (!user) {
      navigate("/profile");
    }
  }, [user, navigate]);

  const handleSubmit =()=>{
    toast.success("Coming soon !");
    onSuccess();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100  bg-opacity-50 flex justify-center items-center backdrop-blur-sm">
      <div className="bg-black p-6 rounded-lg shadow-lg w-full max-w-md z-50">
        <h2 className="text-xl font-bold text-gray-200 mb-4 text-center">
          Confirm Your Registration
        </h2>

        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <h3 className="text-md font-semibold text-gray-700">Participant</h3>
          <p className="text-gray-600">{name}</p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <h3 className="text-md font-semibold text-gray-700">Event Details</h3>
          <p className="text-gray-600">
            <strong>Event:</strong> {event?.eventName}
          </p>
          <p className="text-gray-600">
            <strong>Category:</strong> {event?.category}
          </p>
          <p className="text-gray-600">
            <strong>Team Type:</strong> {event?.teamType}
          </p>
        </div>

        <div className="bg-yellow-100 p-4 rounded-lg mb-4">
          <h3 className="text-md font-semibold text-yellow-700">Guidelines</h3>
          <ul className="list-disc text-gray-700 text-sm pl-4">
          {event.rules?.map((rule, index) =>
                    <li key={index}> {rule}</li>
                
        )}
          </ul>
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventRegPopUp;
