import React,{useEffect} from 'react'
import PreviousEvents from '../Components/PrevEvent'
import UpcomingEvents from '../Components/UpcomingEvent'

function Events() {
  useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-purple-200 to-white dark:from-gray-900 dark:via-purple-900 dark:to-black text-gray-900 dark:text-white py-12 px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        <UpcomingEvents />
        <PreviousEvents />
      </div>
    </div>
  )
}

export default Events
