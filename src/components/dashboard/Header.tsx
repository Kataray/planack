import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from 'src/components/Navbar/Sidebar.tsx';
import Card from '@/components/ui/GenericCard.tsx';
import { CheckCircleIcon, MapPinIcon, CalendarIcon, UsersIcon } from "lucide-react";
import TasksTable from '@/components/ui/TaskList.tsx';
import CalCard from '@/components/ui/CalCard.tsx';
import UserCard from '@/components/ui/UserCard.tsx';
import ResourceIconCard from '@/components/ui/SmallerCards.tsx';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx";

import defaultEventInfo from '@/components/data/eventInfo.json';
import defaultTaskData from '@/components/data/saveTask.json';

function Header() {
    const navigate = useNavigate();

    const [eventData, setEventData] = useState(() => {
        const saved = localStorage.getItem('eventInfo');
        return saved ? JSON.parse(saved) : defaultEventInfo;
    });

    const [taskGroups, setTaskGroups] = useState(() => {
        const saved = localStorage.getItem('taskGroups');
        return saved ? JSON.parse(saved) : defaultTaskData.groups;
    });

    // Team members state
    const [teamMembers, setTeamMembers] = useState([
        { id: 1, name: 'Alex', role: 'Developer', avatar: 'https://github.com/shadcn.png' },
        { id: 2, name: 'Taylor', role: 'Designer', avatar: 'https://github.com/shadcn.png' },
        { id: 3, name: 'Jordan', role: 'Project Manager', avatar: 'https://github.com/shadcn.png' }
    ]);

    useEffect(() => {
        localStorage.setItem('eventInfo', JSON.stringify(eventData));
    }, [eventData]);

    const handleChange = (field: string, value: string) => {
        setEventData({ ...eventData, [field]: value });
    };

    // Task completion functions
    const toggleTaskCompletion = (groupId: number, taskId: number) => {
        setTaskGroups(taskGroups.map(group => {
            if (group.id === groupId) {
                return {
                    ...group,
                    tasks: group.tasks.map(task => {
                        if (task.id === taskId) {
                            return { ...task, completed: !task.completed };
                        }
                        return task;
                    })
                };
            }
            return group;
        }));
    };

    const totalTasks = taskGroups.reduce((acc, group) => acc + group.tasks.filter(task => task.text).length, 0);
    const completedTasks = taskGroups.reduce(
        (acc, group) => acc + group.tasks.filter(task => task.completed && task.text).length,
        0
    );

    // Add new team member
    const addTeamMember = () => {
        const newMember = {
            id: teamMembers.length + 1,
            name: `New Member ${teamMembers.length + 1}`,
            role: 'Team Member',
            avatar: 'https://github.com/shadcn.png'
        };
        setTeamMembers([...teamMembers, newMember]);
    };

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
                        title={`${teamMembers.length} Participants`}
                        subtitle="max 150"
                        icon={<UsersIcon className="text-white h-8 w-8" />}
                        onClick={() => navigate('/team')}
                    />
                    <Card
                        label="Tasks"
                        title={`${completedTasks}/${totalTasks} Completed`}
                        subtitle="40 days left"
                        icon={<CheckCircleIcon className="text-white h-8 w-8" />}
                        onClick={() => navigate('/tasks')}
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
                    <TasksTable
                        taskGroups={taskGroups}
                        onTaskToggle={toggleTaskCompletion}
                        onAddTask={() => navigate('/tasks')}
                    />
                    <CalCard />
                </div>

                <div className="flex ml-10 -mt-23">
                    <UserCard
                        members={teamMembers}
                        onAddMember={addTeamMember}
                        onMemberClick={(member) => navigate(`/team/${member.id}`)}
                    />
                </div>

                {/* Resource Cards Section */}
                <div className="flex justify-end gap-6 ml-10 mr-10 mt-8 absolute bottom-2 right-0">
                    <ResourceIconCard
                        type="resources"
                        onClick={() => navigate('/resources')}
                    />
                    <ResourceIconCard
                        type="photos"
                        onClick={() => navigate('/photos')}
                    />
                    <ResourceIconCard
                        type="finance"
                        onClick={() => navigate('/finance')}
                    />
                </div>
            </section>
        </div>
    );
}

export default Header;