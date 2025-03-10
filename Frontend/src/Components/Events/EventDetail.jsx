import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import EventRegPopUp from './EventRegPopUp';
import { useSelector } from 'react-redux';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEventRegPopUpOpen, setIsEventRegPopUpOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  
  const user = useSelector(state=>state.user);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchEvent = async () => {
      try {
        setLoading(true);
        setError(null);

        const url = `${import.meta.env.VITE_BACKEND_API_URL}events/${id}`;

        console.log("Fetching from URL:", url);

        const response = await axios.get(url, {
          withCredentials: true
        });

        if (isMounted) {
          console.log("API Response:", response.data);

          if (response.data) {
            setEvent(response.data);
          } else {
            console.warn("Empty response data");
            setEvent(null);
          }
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        if (isMounted) {
          setError("Failed to load events");
          setEvent(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchEvent();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleSuccess = () => {
    setIsRegistered(true);
    setIsEventRegPopUpOpen(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-gray-900">
        <div className="text-purple-400 text-xl font-semibold">Loading event details...</div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center py-16 bg-gray-900 text-gray-100">
        <h2 className="text-2xl font-bold text-gray-100 mb-4">Event not found</h2>
        <Link to="/" className="text-purple-400 hover:text-purple-300 font-medium">
          ← Back to Events
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-purple-400 sm:text-5xl text-center mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-200 to-indigo-100 animate-pulse">
            {event.eventName}
          </span>
        </h1>

        <div className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 shadow-lg shadow-black/50">
          <div className="md:flex">
            <div className="md:w-1/2">
              {event.images && event.images.length > 0 ? (
                <div
                  className="h-64 md:h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${event.images[0]})` }}
                />
              ) : (
                <div className="h-64 md:h-full bg-gray-900 flex items-center justify-center">
                  <span className="text-gray-500 text-lg">No Image Available</span>
                </div>
              )}
            </div>

            <div className="md:w-1/2 p-8">
              <div className="flex space-x-3 mb-4">
                <span className="px-3 py-1 bg-purple-600 text-white text-sm font-semibold rounded-full">
                  {event.category}
                </span>
                <span className="px-3 py-1 bg-pink-500 text-white text-sm font-semibold rounded-full">
                  {event.eventType}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-gray-100 mb-4">{event.description}</h1>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                  <span className="block text-sm text-purple-400 font-medium">Team Type</span>
                  <span className="block text-lg text-gray-200">{event.teamType}</span>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                  <span className="block text-sm text-purple-400 font-medium">Number of Rounds</span>
                  <span className="block text-lg text-gray-200">{event.noOfRounds}</span>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                  <span className="block text-sm text-purple-400 font-medium">Participation Fee</span>
                  <span className="block text-lg text-gray-200">₹ {event.participationFee}</span>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                  <span className="block text-sm text-purple-400 font-medium">Prize Money</span>
                  <span className="block text-lg text-gray-200">₹ {event.prize}</span>
                </div>
              </div>
              <button
                onClick={() => setIsEventRegPopUpOpen(true)}
                className="w-full bg-gradient-to-r cursor-pointer from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transform hover:-translate-y-1"
              >
                Register Now
              </button>
            </div>
          </div>
          {event.rules && event.rules.length > 0 && (
            <div className="p-8 border-t border-gray-700">
              <h2 className="text-2xl font-bold text-purple-400 mb-4">Rules & Guidelines</h2>
              <ul className="space-y-2">
                {event.rules.map((rule, index) => (
                  <li key={index} className="text-gray-300 flex items-start">
                    <svg
                      className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      {isEventRegPopUpOpen && (
        <EventRegPopUp
          isOpen={isEventRegPopUpOpen}
          onClose={() => setIsEventRegPopUpOpen(false)}
          onSuccess={handleSuccess}
          event={event}
        />
      )}
    </div>
  );
};

export default EventDetail;