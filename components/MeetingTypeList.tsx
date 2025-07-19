'use client';
import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import {toast} from 'sonner'
import { Textarea } from './ui/textarea';
import ReactDatePicker from 'react-datepicker'
import { Input } from './ui/input';
import Loader from './Loader';

const MeetingTypeList = () => {
   console.log(" MeetingTypeList rendered");
      const router = useRouter();
      const [meetingState, setMeetingState] = useState<
    'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
  >();
  const{user} = useUser();
  const client = useStreamVideoClient();
  const [values, setValues] = useState({dateTime: new Date(), description: '', Link:''});
  const [CallDetails, setCallDetails] = useState<Call>();
   

  const createMeeting = async () => {
    if (!client || !user) return;
    
    try {
        if(!values.dateTime){
          toast('Please select date and time')
          return;

          }

       const id = crypto.randomUUID();
      const call = client.call('default', id);


      if (!call) throw new Error('Failed to create meeting');

      const startsAt =
      values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || 'Instant Meeting';

      await call.getOrCreate({
          data: {
          starts_at: startsAt,
          custom: {
          description
          }
        }
     
  });
        setCallDetails(call);
         if (!values.description) {
        router.push(`/meeting/${call.id}`)
      }

    toast('Meeting Has Created')
} catch(error) {
  console.log(error);
  toast(("Fail."))
}
  };

    if (!client || !user) return <Loader />;

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${CallDetails?.id}`;
  return (
     
     <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
       img= "/icons/add-meeting.svg"
       title ="New Meeting"
       description="Start the Meeting "
       handleClick={() => setMeetingState('isInstantMeeting')} 
       className='bg-[#62ff2e] hover:scale-105 hover:shadow-2xl hover:shadow-[#62ff2e]/30 hover:-translate-y-2 transition-all duration-300 ease-in-out hover:brightness-110'
       />
      <HomeCard img= "/icons/schedule.svg"
       title ="Schedule Meeting"
       description="Plan the Meeting "
       handleClick={() => setMeetingState('isScheduleMeeting')}
       className='bg-[#0E78F9] hover:scale-105 hover:shadow-2xl hover:shadow-[#0E78F9]/30 hover:-translate-y-2 transition-all duration-300 ease-in-out hover:brightness-110'/>

      <HomeCard img= "/icons/recordings.svg"
       title ="View Your Recordings"
       description="Check the Recordings "
       handleClick={() =>  router.push('/recordings')}
       className='bg-[#3515c3] hover:scale-105 hover:shadow-2xl hover:shadow-[#3515c3]/30 hover:-translate-y-2 transition-all duration-300 ease-in-out hover:brightness-110'/>

      <HomeCard img= "/icons/join-meeting.svg"
       title ="Join Meeting"
       description="Via Invitation Link "
       handleClick={() => setMeetingState('isJoiningMeeting')}
       className= 'bg-[#dcc837] hover:scale-105 hover:shadow-2xl hover:shadow-[#dcc837]/30 hover:-translate-y-2 transition-all duration-300 ease-in-out hover:brightness-110'/>


      {!CallDetails ?(
          <MeetingModal  isOpen ={meetingState === 'isScheduleMeeting'}
       onClose={() => setMeetingState(undefined)}
          title="Create a Meeting"
          className ='text-center'
          handleClick={createMeeting}>

            <div className=" w-[300px] flex flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-[#ECF0FF]">
              Add a Description
            </label>
            <Textarea
              className="border-none bg-[#252A41] focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </div>

              <div className="flex w-full flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-[#ECF0FF]">
              Select Date and Time
            </label>
            <ReactDatePicker
              selected = {values.dateTime}
              onChange={(date) => setValues ({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-[#252A41] p-2 focus:outline-none"

              />
              </div>

            </MeetingModal>
      ): (
          <MeetingModal 
          isOpen ={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          className ='text-center'
          handleClick={() =>{
            navigator.clipboard.writeText(meetingLink);
           toast('Link Copied')
          } }

          image= '/icons/checked.svg'
          buttonIcon='/icons/copy.svg'
          buttonText='Copy the Meeting Link'
       /> 

      )}


       <MeetingModal 
       isOpen ={meetingState === 'isInstantMeeting'}
       onClose={() => setMeetingState(undefined)}
          title="Start a Meeting"
          className ='text-center'
          buttonText='Start Meeting'
          handleClick={createMeeting} 
       />

       <MeetingModal 
       isOpen ={meetingState === 'isJoiningMeeting'}
       onClose={() => setMeetingState(undefined)}
          title="Type the link"
          className ='text-center'
          buttonText='join Meeting'
          handleClick={() => router.push(values.Link)}>
            
        <Input
          placeholder="Meeting link"
          onChange={(e) => setValues({ ...values, Link: e.target.value })}
          className="border-none bg-[#252A41] focus-visible:ring-0 focus-visible:ring-offset-0"
        />

       </MeetingModal>

         <MeetingModal
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />

    </section>
  )
}
export default MeetingTypeList

