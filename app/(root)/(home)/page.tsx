'use client';
import MeetingTypeList from '@/components/MeetingTypeList';
import React, { useState, useEffect } from 'react'

const Home = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const time = now.toLocaleTimeString('tr-TR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
      const date = new Intl.DateTimeFormat('tr-TR', { 
        dateStyle: 'full' 
      }).format(now);
      
      setCurrentTime(time);
      setCurrentDate(date);
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    
    
    return () => clearInterval(interval);
  }, []);
  return (
      <section className='flex size-full flex-col gap-5 text-white'>
     <div className="h-[300px] w-full rounded-[20px] bg-[url('/images/lacivert-home.jpg')] bg-cover">
      <div className="flex h-full flex-col justify-center max-md:px-5 max-md:py-8 lg:p-11">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">{currentTime}</h1>
            <p className="text-lg font-medium text-[#C9DDFF] lg:text-2xl">{currentDate}</p>
          </div>
        </div>
        </div>
      <MeetingTypeList/>
     </section>
   
  )
}

export default Home
