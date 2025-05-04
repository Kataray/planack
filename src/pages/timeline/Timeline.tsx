import { useState, useEffect } from "react";
import Sidebar from "src/components/Navbar/Sidebar.tsx";

type Event = {
    id: number;
    title: string;
    description: string;
    whenWhere: string;
};

type Day = {
    id: number;
    title: string;
    events: Event[];
};

function Timeline() {
    const [days, setDays] = useState<Day[]>(() => {
        const savedDays = localStorage.getItem('timelineData');
        return savedDays ? JSON.parse(savedDays) : [
            {
                id: 1,
                title: "Day 1",
                events: [
                    {
                        id: 101,
                        title: "React Advanced",
                        description: "Learn advanced React patterns",
                        whenWhere: "2:00 PM - Main Hall"
                    },
                    {
                        id: 102,
                        title: "Swift Event",
                        description: "Learn Swift!",
                        whenWhere: "5:00 PM - Breakout Room A"
                    }
                ]
            },
            {
                id: 2,
                title: "Day 2",
                events: [
                    {
                        id: 201,
                        title: "Advanced Techniques",
                        description: "Learn cutting-edge methods from industry experts",
                        whenWhere: "10:00 AM - Workshop Room 3"
                    }
                ]
            }
        ];
    });

    useEffect(() => {
        localStorage.setItem('timelineData', JSON.stringify(days));
    }, [days]);

    const addDay = () => {
        setDays([
            ...days,
            {
                id: Date.now(),
                title: `Day ${days.length + 1}`,
                events: [],
            },
        ]);
    };

    const updateDayTitle = (id: number, newTitle: string) => {
        setDays(days.map(day => day.id === id ? { ...day, title: newTitle } : day));
    };

    const addEventToDay = (dayId: number) => {
        setDays(days.map(day =>
            day.id === dayId
                ? {
                    ...day,
                    events: [
                        ...day.events,
                        {
                            id: Date.now(),
                            title: "New Event",
                            description: "Short description of the event",
                            whenWhere: "When and where the event happens"
                        },
                    ],
                }
                : day
        ));
    };

    const updateEventDetails = (dayId: number, eventId: number, field: string, newValue: string) => {
        setDays(days.map(day =>
            day.id === dayId
                ? {
                    ...day,
                    events: day.events.map(event =>
                        event.id === eventId ? { ...event, [field]: newValue } : event
                    ),
                }
                : day
        ));
    };

    return (
        <div className="flex">
            <Sidebar />
            <section className="bg-black relative w-screen h-screen overflow-y-scroll text-white p-10">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="font-cal text-[4vh]">Timeline</h1>
                        <h2 className="font-cal text-[2.5vh] -mt-2">How is the week setup?</h2>
                    </div>
                    <button
                        onClick={addDay}
                        className="bg-white text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-200">Add Day</button>
                </div>

                <div className="mt-10 flex flex-col gap-6">
                    {days.map((day) => (
                        <div key={day.id} className="bg-[#19191c] text-white p-6 rounded-xl shadow-md">
                            {/* Editable Day Title */}
                            <input
                                value={day.title}
                                onChange={(e) => updateDayTitle(day.id, e.target.value)}
                                className="font-bold text-2xl w-full bg-transparent outline-none border-b border-black pb-2 mb-5"
                            />

                            {/* Events Row */}
                            <div className="flex gap-6 overflow-x-auto">
                                {day.events.map((event) => (
                                    <div
                                        key={event.id}
                                        className="bg-[#000] p-5 rounded-xl min-w-[300px] min-h-[160px] shadow-inner flex flex-col gap-4"
                                    >
                                        {/* Editable Event Title */}
                                        <input
                                            value={event.title}
                                            onChange={(e) =>
                                                updateEventDetails(day.id, event.id, "title", e.target.value)
                                            }
                                            className="font-semibold text-2xl text-white bg-transparent outline-none"
                                        />
                                        {/* Editable Event Description */}
                                        <input
                                            value={event.description}
                                            onChange={(e) =>
                                                updateEventDetails(day.id, event.id, "description", e.target.value)
                                            }
                                            className="text-lg text-white bg-transparent outline-none"
                                        />
                                        {/* Editable When/Where */}
                                        <input
                                            value={event.whenWhere}
                                            onChange={(e) =>
                                                updateEventDetails(day.id, event.id, "whenWhere", e.target.value)
                                            }
                                            className="text-sm  text-[#3c3c3c] bg-transparent outline-none"
                                        />
                                    </div>
                                ))}

                                {/* + Button */}
                                <button
                                    onClick={() => addEventToDay(day.id)}
                                    className="min-w-[120px] min-h-[120px] !bg-black text-white rounded-xl text-[3rem] font-extrabold flex items-center justify-center hover:bg-blue-700 transition">+</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Timeline;