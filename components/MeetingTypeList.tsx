'use client'

import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'

const MeetingTypeList = () => {
    const router = useRouter();
    const [meetingState, setmeetingState] = useState<"isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined>()

    return (
        <section className=" h-screen flex size-full flex-col gap-10 text-white overflow-y-hidden">
            <div className='h-1/3 w-full flex justify-center items-center gap-10'>
                <div className='h-full w-1/3 border-2 rounded-xl border-black'>
                    <HomeCard
                        img="/icons/add-meeting.svg"
                        title="New Meeting"
                        description="Start an instant meeting"
                        handleClick={() => setmeetingState("isJoiningMeeting")
                        }
                        className="bg-orange-1"
                    />
                </div>
                <div className='h-full w-3/5 border-2 rounded-xl border-black'>
                    <HomeCard
                        img="/icons/schedule.svg"
                        title="Schedule Meeting"
                        description="Plan your meeting"
                        handleClick={() => setmeetingState("isScheduleMeeting")}
                        className="bg-blue-1"
                    />
                </div>


            </div>

            <div className='h-1/3 w-full flex justify-center items-center gap-10'>
                <div className='h-full w-3/5 border-2 rounded-xl border-black'>
                    <HomeCard
                        img="/icons/recordings.svg"
                        title="view Recording"
                        description="Check out your Recordings"
                        handleClick={() => setmeetingState("isJoiningMeeting")}
                        className="bg-purple-1"
                    />
                </div>

                <div className='h-full w-1/3 border-2 rounded-xl border-black'>
                    <HomeCard
                        img="/icons/join-meeting.svg"
                        title="New Meeting"
                        description="Start an instant meeting"
                        handleClick={() => router.push('/recordings')}
                        className="bg-yellow-1"
                    />
                </div>

            </div>


        </section>
    )
}

export default MeetingTypeList