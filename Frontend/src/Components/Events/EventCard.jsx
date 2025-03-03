import React from "react";
import { Link, useNavigate } from "react-router-dom";
import tempImg from "../../assets/Landing/White.png";

const EventCard = ({ event }) => {
  const { eventId, eventName, description, category, eventType, images } = event;
  const navigate = useNavigate();

  const imageUrl = images && images.length > 0 ? tempImg : tempImg;

  return (
    <div className="group bg-gray-800 cursor-pointer rounded-xl overflow-hidden transition-all duration-300 border border-gray-700 hover:border-gray-500 shadow-lg shadow-black/30 hover:shadow-purple-500/20">
      <Link to={`/events/${eventId}`}>
        <div
          className="relative h-48 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div className="absolute top-3 left-3 px-3 py-1 bg-purple-600 text-white text-xs font-semibold rounded-full">
            {eventType}
          </div>
          <div className="absolute top-3 right-3 px-3 py-1 bg-pink-500 text-white text-xs font-semibold rounded-full">
            {category}
          </div>
        </div>
      </Link>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-100 mb-2 group-hover:text-purple-400 transition-colors duration-200">
          {eventName}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{description}</p>
        <Link to={`/events/${eventId}`}>
          <div className="flex items-center justify-between text-purple-400 font-medium">
            <span>Learn More</span>
            <span className="transform transition-transform duration-200 group-hover:translate-x-2">
              →
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
