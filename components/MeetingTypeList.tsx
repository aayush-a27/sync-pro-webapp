'use client'

import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { useToast } from "@/components/ui/use-toast"
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
// import MeetingModal from './MeetingModal';
// import { motion } from "framer-motion"

const MeetingTypeList = () => {
    const router = useRouter();
    const [meetingState, setMeetingState] = useState<"isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined>()

    const {user} =useUser();
    const client = useStreamVideoClient();
    const [values,setValues]= useState({
        dateTime: new Date(),
        description: '',
        link: ''
    })

    const [callDetails,setCallDetails]= useState<Call>()
    const { toast } = useToast()
    const createMeeting=async ()=>{
        if(!client||!user) return;

        try {
            if(!values.dateTime){
                toast({title: "Please select a date and time",})
                return;
            }
            const id= crypto.randomUUID();
            const call= client.call('default',id);

            if(!call) throw new Error('Failed to create call');
            
            const startsAt = values.dateTime.toISOString()||
            new Date(Date.now()).toISOString();
            const description = values.description || 'Instant Meeting';

            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description,
                    },
                },
            });
            setCallDetails(call);

            if(!values.description){
                router.push(`/meeting/${call.id}`)
            }
            toast({title: "Meeting Created",})
        } catch (error) {
            console.log(error);
            toast({title: "Failed to create meeting",})
        }
    }
    return (
        <section className=" h-screen flex size-full flex-col gap-10 text-white overflow-y-hidden">
             
            <div className='h-1/3 w-full flex justify-center items-center gap-10'>
                <div className='h-full w-1/3  rounded-xl border-black'onClick={() => {setMeetingState("isInstantMeeting")}}>
                    <HomeCard
                        img="/icons/add-meeting.svg"
                        title="New Meeting"
                        description="Start an instant meeting"
                        handleClick={() => setMeetingState("isInstantMeeting")
                        }
                        className="bg-gradient-to-r from-purple-700 to-blue-300 "
                    />
                </div>
                
                <div className='h-full w-3/5  rounded-xl border-black'>
                    <HomeCard
                        img="/icons/join-meeting.svg"
                        title="Joining Meeting"
                        description="join your meeting"
                        handleClick={() => setMeetingState("isJoiningMeeting")}
                        className="bg-gradient-to-r from-green-700 to-blue-500 "
                    />
                </div>


            </div>

            <div className='h-1/3 w-full flex justify-center items-center gap-10'>
                <div className='h-full w-3/5  rounded-xl border-black'>
                    <HomeCard
                        img="/icons/schedule.svg"
                        title="Schedule Meeting"
                        description="Plan your meeting"
                        handleClick={() => setMeetingState("isJoiningMeeting")}
                        className="bg-gradient-to-r from-green-900 to-lime-500 "
                    />
                </div>

                <div className='h-full w-1/3  rounded-xl border-black'>
                    <HomeCard
                        img="/icons/recordings.svg"
                        title="View Recordings"
                        description="Check out your Recordings"
                        handleClick={() => router.push('/recordings')}
                        className="bg-gradient-to-r from-indigo-900 to-blue-300"
                    />
                </div>

            </div>
            <MeetingModal 
                isOpen={meetingState==='isInstantMeeting'}
                onClose={()=>setMeetingState(undefined)}
                title="Start an Instant Meeting"
                className="text-center"
                buttonText="Start Meeting"
                handleClick={createMeeting}
                
            />
            
        </section>
    )
}

export default MeetingTypeList