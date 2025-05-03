function Sidebar() {
    return (
        <section className="bg-[#19191c] flex flex-col w-1/4 h-screen">

            <h1 className="font-cal text-[5vh] flex justify-start px-5 mt-5 text-[#FFFFFF]">
                Planack
            </h1>

            <div className="flex flex-col flex-grow space-y-2 ml-2 overflow-hidden">

                <div className="sidebar-link hover:bg-[#3c3c3c] hover:border-b-2 hover:border-[#FFFFFF] hover:scale-105 hover:rounded-md hover:shadow-md transition-all duration-300 p-3">
                    <h2 className="font-cal text-[3vh] text-white">Dashboard</h2>
                </div>

                <div className="sidebar-link hover:bg-[#3c3c3c] hover:border-b-2 hover:border-[#FFFFFF] hover:scale-105 hover:rounded-md hover:shadow-md transition-all duration-300 p-3">
                    <h2 className="font-cal text-[3vh] text-white">Calendar</h2>
                </div>

                <div className="sidebar-link hover:bg-[#3c3c3c] hover:border-b-2 hover:border-[#FFFFFF] hover:scale-105 hover:rounded-md hover:shadow-md transition-all duration-300 p-3">
                    <h2 className="font-cal text-[3vh] text-white">Team</h2>
                </div>

                <div className="sidebar-link hover:bg-[#3c3c3c] hover:border-b-2 hover:border-[#FFFFFF] hover:scale-105 hover:rounded-md hover:shadow-md transition-all duration-300 p-3">
                    <h2 className="font-cal text-[3vh] text-white">Tasks</h2>
                </div>

                <div className="sidebar-link hover:bg-[#3c3c3c] hover:border-b-2 hover:border-[#FFFFFF] hover:scale-105 hover:rounded-md hover:shadow-md transition-all duration-300 p-3">
                    <h2 className="font-cal text-[3vh] text-white">Resources</h2>
                </div>

                <div className="sidebar-link hover:bg-[#3c3c3c] hover:border-b-2 hover:border-[#FFFFFF] hover:scale-105 hover:rounded-md hover:shadow-md transition-all duration-300 p-3">
                    <h2 className="font-cal text-[3vh] text-white">Finance</h2>
                </div>

                <div className="sidebar-link hover:bg-[#3c3c3c] hover:border-b-2 hover:border-[#FFFFFF] hover:scale-105 hover:rounded-md hover:shadow-md transition-all duration-300 p-3">
                    <h2 className="font-cal text-[3vh] text-white">Workshops</h2>
                </div>

                <div className="sidebar-link hover:bg-[#3c3c3c] hover:border-b-2 hover:border-[#FFFFFF] hover:scale-105 hover:rounded-md hover:shadow-md transition-all duration-300 p-3">
                    <h2 className="font-cal text-[3vh] text-white">Timeline</h2>
                </div>

                <div className="sidebar-link hover:bg-[#3c3c3c] hover:border-b-2 hover:border-[#FFFFFF] hover:scale-105 hover:rounded-md hover:shadow-md transition-all duration-300 p-3">
                    <h2 className="font-cal text-[3vh] text-white">Photos</h2>
                </div>
            </div>
        </section>
    );
}

export default Sidebar;
