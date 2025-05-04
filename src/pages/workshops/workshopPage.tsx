"use client";

import { useState, useEffect } from "react";
import Sidebar from "src/components/Navbar/Sidebar";
import AddCard from "src/components/ui/addCard";

interface Task {
    id: number;
    text: string;
    completed: boolean;
}

interface WorkshopGroup {
    id: number;
    name: string;
    tasks: Task[];
    info?: string;
}

export default function WorkshopBoard() {
    const [workshops, setWorkshops] = useState<WorkshopGroup[]>(() => {
        const saved = localStorage.getItem("workshopGroups");
        return saved ? JSON.parse(saved) : [];
    });

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [workshopName, setWorkshopName] = useState("");
    const [selectedWorkshop, setSelectedWorkshop] = useState<WorkshopGroup | null>(null);
    const [infoInput, setInfoInput] = useState("");

    useEffect(() => {
        localStorage.setItem("workshopGroups", JSON.stringify(workshops));
    }, [workshops]);

    const openPopup = () => {
        setWorkshopName("");
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const createWorkshop = () => {
        if (!workshopName.trim()) return;
        const newWorkshop: WorkshopGroup = {
            id: Date.now(),
            name: workshopName.trim(),
            tasks: [],
        };
        setWorkshops([...workshops, newWorkshop]);
        closePopup();
    };

    const handleWorkshopClick = (workshop: WorkshopGroup) => {
        setSelectedWorkshop(workshop);
        setInfoInput(workshop.info || "");
    };

    const handleSaveInfo = () => {
        if (selectedWorkshop) {
            const updated = workshops.map((group) =>
                group.id === selectedWorkshop.id ? { ...group, info: infoInput } : group
            );
            setWorkshops(updated);
            setSelectedWorkshop(null);
        }
    };

    return (
        <div className="flex min-h-screen w-screen bg-black text-white">
            <Sidebar />
            <div className="flex-1 mr-10">
                <h1 className="font-cal text-[4vh] ml-10 mt-7">Workshops</h1>
                <h2 className="font-cal text-[2.5vh] ml-10 -mt-2">
                    Organize workshops and add details
                </h2>

                <div className="flex flex-wrap gap-6 ml-10 mt-8">
                    {[...workshops, { id: -1, name: "__add_card__", tasks: [] }].map((group) => (
                        <div
                            key={group.id}
                            className="w-64 min-h-[12rem] bg-[#19191c] p-4 rounded-xl shadow-xl text-white flex flex-col justify-between cursor-pointer"
                            onClick={() => {
                                if (group.name === "__add_card__") return;
                                handleWorkshopClick(group);
                            }}
                        >
                            {group.name === "__add_card__" ? (
                                <AddCard onClick={openPopup} />
                            ) : (
                                <>
                                    <h2 className="text-lg font-bold text-center mb-4">{group.name}</h2>
                                    <div className="flex-1 flex items-center justify-center px-2">
                                        <p className="text-center text-white text-lg break-all w-full max-w-full px-2">
                                            {group.info ? group.info : "Click to add details..."}
                                        </p>
                                    </div>
                                </>




                            )}
                        </div>
                    ))}
                </div>

                {/* Workshop Creation Popup */}
                {isPopupOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-[#19191c] p-6 rounded-lg shadow-lg w-full max-w-md text-white">
                            <h2 className="text-xl font-bold mb-4">Create Workshop</h2>
                            <input
                                className="w-full border rounded p-2 mb-4 text-white bg-[#2a2a2f]"
                                placeholder="Workshop name"
                                value={workshopName}
                                onChange={(e) => setWorkshopName(e.target.value)}
                            />
                            <div className="flex justify-end gap-2 mt-6">
                                <button
                                    className="px-4 py-2 border !bg-[#19191c] !text-white rounded hover:bg-neutral-900"
                                    onClick={closePopup}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-4 py-2 border !bg-[#19191c] !text-white rounded hover:bg-neutral-900"
                                    onClick={createWorkshop}
                                >
                                    Create
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Workshop Info Popup */}
                {selectedWorkshop && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-[#19191c] p-6 rounded-lg shadow-lg w-full max-w-md text-white">
                            <h2 className="text-xl font-bold mb-4">
                                Details for "{selectedWorkshop.name}"
                            </h2>
                            <textarea
                                className="w-full h-32 p-2 border rounded bg-[#2a2a2f] text-white resize-none"
                                placeholder="Enter details about this workshop..."
                                value={infoInput}
                                onChange={(e) => setInfoInput(e.target.value)}
                            />
                            <div className="flex justify-between mt-6">
                                <button
                                    className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white"
                                    onClick={() => {
                                        setWorkshops(workshops.filter((w) => w.id !== selectedWorkshop.id));
                                        setSelectedWorkshop(null);
                                    }}
                                >
                                    Delete
                                </button>
                                <div className="flex gap-2">
                                    <button
                                        className="px-4 py-2 border !bg-[#19191c] !text-white rounded hover:bg-neutral-900"
                                        onClick={() => setSelectedWorkshop(null)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="px-4 py-2 border !bg-[#19191c] !text-white rounded hover:bg-neutral-900"
                                        onClick={handleSaveInfo}
                                    >
                                        Done
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
