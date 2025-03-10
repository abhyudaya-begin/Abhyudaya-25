import React from 'react';
import EventCard from './EventCard';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const EventGrid = ({ events }) => {

  if (events?.length === 0) {
    return (
      <div className="text-center py-16 text-lg text-gray-400">
        No events found in this category
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {events?.map(event => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
};

export default EventGrid;