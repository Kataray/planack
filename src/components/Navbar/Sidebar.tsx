function Sidebar() {
    return (
        <section className="bg-[#19191c] relative w-90 h-screen overflow-hidden">

            <h1 className="font-cal text-5xl flex justify-left ml-5 mt-5 text-[#FFFFFF]">Planack</h1>

            <div className="mt-10 space-y-6 ml-5 flex flex-col overflow-y-auto">

                <div className="sidebar-link hover:bg-[#3c3c3c] hover:border-b-2 hover:border-[#FFFFFF] hover:scale-105 hover:rounded-md transition-all duration-200 p-3">
                    <h2 className="font-cal text-xl text-white">Dashboard</h2>
                </div>

                <div className="sidebar-link hover:bg-[#3c3c3c] hover:border-b-2 hover:border-[#FFFFFF] hover:scale-105 hover:rounded-md transition-all duration-200 p-3">
                    <h2 className="font-cal text-xl text-white">Calendar</h2>
                </div>

                <div className="sidebar-link hover:bg-[#3c3c3c] hover:border-b-2 hover:border-[#FFFFFF] hover:scale-105 hover:rounded-md transition-all duration-200 p-3">
                    <h2 className="font-cal text-xl text-white">Team</h2>
                </div>

                <div className="sidebar-link hover:bg-[#3c3c3c] hover:border-b-2 hover:border-[#FFFFFF] hover:scale-105 hover:rounded-md transition-all duration-200 p-3">
                    <h2 className="font-cal text-xl text-white">Tasks</h2>
                </div>

                <div className="sidebar-link hover:bg-[#3c3c3c] hover:border-b-2 hover:border-[#FFFFFF] hover:scale-105 hover:rounded-md transition-all duration-200 p-3">
                    <h2 className="font-cal text-xl text-white">Resources</h2>
                </div>

                <div className="sidebar-link hover:bg-[#3c3c3c] hover:border-b-2 hover:border-[#FFFFFF] hover:scale-105 hover:rounded-md transition-all duration-200 p-3">
                    <h2 className="font-cal text-xl text-white">Finance</h2>
                </div>

                <div className="sidebar-link hover:bg-[#3c3c3c] hover:border-b-2 hover:border-[#FFFFFF] hover:scale-105 hover:rounded-md transition-all duration-200 p-3">
                    <h2 className="font-cal text-xl text-white">Workshops</h2>
                </div>

                <div className="sidebar-link hover:bg-[#3c3c3c] hover:border-b-2 hover:border-[#FFFFFF] hover:scale-105 hover:rounded-md transition-all duration-200 p-3">
                    <h2 className="font-cal text-xl text-white">Timeline</h2>
                </div>

                <div className="sidebar-link hover:bg-[#3c3c3c] hover:border-b-2 hover:border-[#FFFFFF] hover:scale-105 hover:rounded-md transition-all duration-200 p-3">
                    <h2 className="font-cal text-xl text-white">Photos</h2>
                </div>
            </div>
        </section>
    );
}

export default Sidebar;
