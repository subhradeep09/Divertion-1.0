import React, { useState } from 'react';
import FilterBar from '../../components/Filter';
import Pagination from '../../components/Pagination';
import NoEventFound from '../../components/NoEventFound';
import SidebarFilters from './SideBar';
import EventListing from './EventsListing';

const BrowseEvents = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filtersApplied, setFiltersApplied] = useState(false);

  const handleFilter = (filters) => {
    setFiltersApplied(true);
    const filtered = events.filter(event => {
      // Add actual filter condition logic here
      return false; // placeholder: simulate no match
    });
    setFilteredEvents(filtered);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="relative overflow-hidden">
      <div className="relative z-10">
        <div className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-pink-500 opacity-30 blur-3xl z-0" style={{ filter: 'blur(120px)' }}></div>
      <div className="pointer-events-none absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-blue-500 opacity-25 blur-3xl z-0" style={{ filter: 'blur(100px)' }}></div>
      <div className="pointer-events-none absolute bottom-0 left-1/2 w-[350px] h-[350px] rounded-full bg-purple-500 opacity-20 blur-3xl z-0" style={{ filter: 'blur(90px)' }}></div>
        <div className="flex flex-col md:flex-row gap-6 px-6 py-30 bg-[#111113] min-h-screen">
          <div className="w-full md:w-1/4">
            <SidebarFilters onFilter={handleFilter} />
          </div>

          <div className="w-full md:w-3/4">
            <FilterBar onFilter={handleFilter} />
            {filtersApplied ? (
              filteredEvents.length === 0 ? (
                <NoEventFound />
              ) : (
                <>
                  <EventListing events={filteredEvents} currentPage={currentPage} />
                  <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
                </>
              )
            ) : (
              <>
                <EventListing events={events} currentPage={currentPage} />
                <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseEvents;
