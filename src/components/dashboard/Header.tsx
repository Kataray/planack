import { useEffect, useState } from 'react';
import Sidebar from 'src/components/Navbar/Sidebar.tsx';
import Card from '@/components/ui/GenericCard.tsx';
import { CheckCircleIcon, MapPinIcon, CalendarIcon, UsersIcon } from "lucide-react";
import TasksTable from '@/components/ui/TaskList.tsx';
import CalCard from '@/components/ui/CalCard.tsx';
import UserCard from '@/components/ui/UserCard.tsx';
import ResourceIconCard from '@/components/ui/SmallerCards.tsx';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx";

import defaultEventInfo from '@/components/data/eventInfo.json';
import defaultTaskData from '@/components/data/saveTask.json'; // import your task data

function Header() {
    const [eventData, setEventData] = useState(() => {
        const saved = localStorage.getItem('eventInfo');
        return saved ? JSON.parse(saved) : defaultEventInfo;
    });

    const [taskGroups, setTaskGroups] = useState(() => {
        const saved = localStorage.getItem('taskGroups');
        return saved ? JSON.parse(saved) : defaultTaskData.groups;
    });

    useEffect(() => {
        localStorage.setItem('eventInfo', JSON.stringify(eventData));
    }, [eventData]);

    const handleChange = (field: string, value: string) => {
        setEventData({ ...eventData, [field]: value });
    };

    // Count total tasks by "text" property
    const totalTasks = taskGroups.reduce((acc, group) => acc + group.tasks.filter(task => task.text).length, 0);

    // Count completed tasks
    const completedTasks = taskGroups.reduce(
        (acc, group) => acc + group.tasks.filter(task => task.completed && task.text).length,
        0
    );

    return (
        <div className="flex">
            <Sidebar />
            <section className="bg-[#000000] relative w-screen h-screen overflow-y-scroll text-white">
                <h1 className="font-cal text-[4vh] ml-10 mt-7">Hackathon Dashboard</h1>
                <h2 className="font-cal text-[2.5vh] ml-10 -mt-2">Every hack on track</h2>

                <div className="absolute right-15 top-13 scale-180">
                    <Avatar>
                        <AvatarImage src="https://github.com/Kataray.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>

                <div className="flex gap-6 ml-10 mt-8 mr-10">
                    <Card
                        label="Planning for"
                        title={
                            <input
                                className="bg-transparent text-white text-[2.5vh] font-cal font-bold outline-none w-full"
                                value={eventData.title}
                                onChange={(e) => handleChange('title', e.target.value)}
                            />
                        }
                        subtitle={
                            <input
                                className="bg-transparent text-white"
                                value={eventData.date}
                                onChange={(e) => handleChange('date', e.target.value)}
                            />
                        }
                        icon={<CalendarIcon className="text-white h-8 w-8" />}
                    />
                    <Card
                        label="Participants"
                        title="30 Participants"
                        subtitle="max 150"
                        icon={<UsersIcon className="text-white h-8 w-8" />}
                    />
                    <Card
                        label="Tasks"
                        title={`${completedTasks}/${totalTasks} Completed`}
                        subtitle="40 days left"
                        icon={<CheckCircleIcon className="text-white h-8 w-8" />}
                    />
                    <Card
                        label="Location"
                        title={
                            <input
                                className="bg-transparent text-white font-semibold text-[2.5vh] font-cal w-full outline-none"
                                value={eventData.location}
                                onChange={(e) => handleChange('location', e.target.value)}
                            />
                        }
                        subtitle={
                            <input
                                className="bg-transparent text-white"
                                value={eventData.address}
                                onChange={(e) => handleChange('address', e.target.value)}
                            />
                        }
                        icon={<MapPinIcon className="text-white h-8 w-8" />}
                    />
                </div>

                <div className="flex gap-6 ml-10 mt-8 mr-10">
                    <TasksTable />
                    <CalCard />
                </div>

                <div className="flex ml-10 -mt-23">
                    <UserCard />
                </div>

                <div className="flex ml-10 -mt-23">
                    <ResourceIconCard />
                </div>
            </section>
        </div>
    );
}

export default Header;
