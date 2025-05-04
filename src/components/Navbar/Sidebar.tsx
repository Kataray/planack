import { Link } from 'react-router-dom'; // Import Link component from react-router-dom
import logo from '@/assets/logo.png';

function Sidebar() {
    return (
        <section className="bg-[#19191c] flex flex-col w-90 h-screen">
            <img src={logo} alt="Logo" className="size-11 absolute ml-5 mt-7" />
            <h1 className="font-cal text-[5vh] flex ml-18 mt-5 text-[#FFFFFF]">
                Planack
            </h1>

            <div className="flex flex-col flex-grow space-y-2 mt-10 ml-2 overflow-hidden">
                {/* Sidebar link to Dashboard */}
                <Link to="/" className="sidebar-link hover:bg-[#3c3c3c] hover:border-b-2 hover:border-[#FFFFFF] hover:scale-105 hover:rounded-md hover:shadow-md transition-all duration-300 p-3">
                    <h2 className="font-cal text-[3vh] !text-white no-underline">Dashboard</h2>
                </Link>

                {/* Sidebar link to Calendar */}
                <Link to="/calendar" className="sidebar-link hover:bg-[#3c3c3c] hover:border-b-2 hover:border-[#FFFFFF] hover:scale-105 hover:rounded-md hover:shadow-md transition-all duration-300 p-3">
                    <h2 className="font-cal text-[3vh] !text-white no-underline">Calendar</h2>
                </Link>

                {/* Sidebar link to Team */}
                <Link to="/team" className="sidebar-link hover:bg-[#3c3c3c] hover:border-b-2 hover:border-[#FFFFFF] hover:scale-105 hover:rounded-md hover:shadow-md transition-all duration-300 p-3">
                    <h2 className="font-cal text-[3vh] !text-white no-underline">Team</h2>
                </Link>

                {/* Sidebar link to Tasks */}
                <Link to="/tasks" className="sidebar-link hover:bg-[#3c3c3c] hover:border-b-2 hover:border-[#FFFFFF] hover:scale-105 hover:rounded-md hover:shadow-md transition-all duration-300 p-3">
                    <h2 className="font-cal text-[3vh] !text-white no-underline">Tasks</h2>
                </Link>

                {/* Sidebar link to Resources */}
                <Link to="/resources" className="sidebar-link hover:bg-[#3c3c3c] hover:border-b-2 hover:border-[#FFFFFF] hover:scale-105 hover:rounded-md hover:shadow-md transition-all duration-300 p-3">
                    <h2 className="font-cal text-[3vh] !text-white no-underline">Resources</h2>
                </Link>

                {/* Sidebar link to Finance */}
                <Link to="/finance" className="sidebar-link hover:bg-[#3c3c3c] hover:border-b-2 hover:border-[#FFFFFF] hover:scale-105 hover:rounded-md hover:shadow-md transition-all duration-300 p-3">
                    <h2 className="font-cal text-[3vh] !text-white no-underline">Finance</h2>
                </Link>

                {/* Sidebar link to Workshops */}
                <Link to="/workshops" className="sidebar-link hover:bg-[#3c3c3c] hover:border-b-2 hover:border-[#FFFFFF] hover:scale-105 hover:rounded-md hover:shadow-md transition-all duration-300 p-3">
                    <h2 className="font-cal text-[3vh] !text-white no-underline">Workshops</h2>
                </Link>

                {/* Sidebar link to Timeline */}
                <Link to="/timeline" className="sidebar-link hover:bg-[#3c3c3c] hover:border-b-2 hover:border-[#FFFFFF] hover:scale-105 hover:rounded-md hover:shadow-md transition-all duration-300 p-3">
                    <h2 className="font-cal text-[3vh] !text-white no-underline">Timeline</h2>
                </Link>

                {/* Sidebar link to Photos */}
                <Link to="/photos" className="sidebar-link hover:bg-[#3c3c3c] hover:border-b-2 hover:border-[#FFFFFF] hover:scale-105 hover:rounded-md hover:shadow-md transition-all duration-300 p-3">
                    <h2 className="font-cal text-[3vh] !text-white no-underline">Photos</h2>
                </Link>
            </div>
        </section>
    );
}

export default Sidebar;
