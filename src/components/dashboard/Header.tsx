import Sidebar from 'src/components/Navbar/Sidebar.tsx';
import Card from '@/components/ui/GenericCard.tsx';
import { CheckCircleIcon } from "lucide-react";
import { MapPinIcon } from "lucide-react";
import { CalendarIcon, UsersIcon } from "lucide-react";
import TasksTable from '@/components/ui/TaskList.tsx'
import CalCard from '@/components/ui/CalCard.tsx'
import UserCard from '@/components/ui/UserCard.tsx'

function Header() {
    return (
        <div className="flex">
            <Sidebar />
            <section className="bg-[#000000] relative w-screen h-screen overflow-y-scroll">
                <h1 className="font-cal text-[4vh] flex justify-start ml-10 mt-7 text-[#FFFFFF]">
                    Hackathon Dashboard
                </h1>
                <h2 className="font-cal text-[2.5vh] flex justify-start ml-10 -mt-2 text-[#FFFFFF]">
                    Every hack on track
                </h2>

                <div className="flex gap-6 ml-10 mt-8 mr-10">
                    <Card
                        label="Planning for"
                        title="UwinHacks 2025"
                        subtitle="Nov 22 - Nov 25, 10am"
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
                        title="20/60 Completed"
                        subtitle="40 days left"
                        icon={<CheckCircleIcon className="text-white h-8 w-8" />}
                    />
                    <Card
                        label="Location"
                        title="UWindsor"
                        subtitle="401 Sunset, Windsor, ON"
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

            </section>
        </div>
    );
}

export default Header;
