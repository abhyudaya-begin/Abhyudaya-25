import React, { useState, useEffect } from 'react';
import EventTabs from './EventTabs';
import EventGrid from './EventGrid';
import axios from 'axios';

const Events = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Extract unique categories
  const categories = ['All', 'Art', 'Dance', 'Music', 'Dramatics', 'Literature', 'Other'];
  
  // Fetch all events once
  useEffect(() => {
    let isMounted = true;
    
    const fetchAllEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const url = `${import.meta.env.VITE_BACKEND_API_URL}events/all`;
        
        console.log("Fetching all events from URL:", url);
        
        const response = await axios.get(url, {
          withCredentials: true
        });
        
        // Make sure component is still mounted before updating state
        if (isMounted) {
          let eventsData = [];
          
          if (response.data && Array.isArray(response.data)) {
            eventsData = response.data;
          } else if (response.data) {
            eventsData = Array.isArray(response.data.events) ? response.data.events : [];
          } else {
            console.warn("Empty response data");
          }
          
          setAllEvents(eventsData);
          setFilteredEvents(eventsData); // Initially show all events
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        if (isMounted) {
          setError("Failed to load events");
          setAllEvents([]);
          setFilteredEvents([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    fetchAllEvents();
    
    // Cleanup function to prevent state updates after unmount
    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array means this runs once on mount
  
  // Filter events when category changes
  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredEvents(allEvents);
    } else {
      setFilteredEvents(allEvents.filter(event => event.category === activeCategory));
    }
  }, [activeCategory, allEvents]);
  
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-purple-400 sm:text-5xl">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-200 to-indigo-100 animate-pulse">
              Event-`de`-25
            </span>
          </h1>
        </div>
        
        <EventTabs 
          categories={categories} 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
        />
        
        {loading ? (
          <div className="text-center py-10">
            <p>Loading events...</p>
          </div>
        ) : error ? (
          <div className="text-center py-10 text-red-400">
            <p>Error: {error}</p>
            <button 
              onClick={() => setActiveCategory(activeCategory)} 
              className="mt-4 px-4 py-2 bg-purple-500 rounded hover:bg-purple-600"
            >
              Try Again
            </button>
          </div>
        ) : filteredEvents.length > 0 ? (
          <EventGrid events={filteredEvents} />
        ) : (
          <div className="text-center py-10">
            <p>No events found for this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;