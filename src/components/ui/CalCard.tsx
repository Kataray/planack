"use client";
import { cn } from "@/lib/utils";
import { CalendarDays, Clock, MapPin } from "lucide-react";

interface EventCardProps {
    className?: string;
    events?: {
        title: string;
        date: string;
        time: string;
        location: string;
        description?: string;
    }[];
}

export default function EventCard({ className, events = [] }: EventCardProps) {
    const defaultEvents = [
        {
            title: "Workshop: React Advanced",
            date: "May 12, 2024",
            time: "2:00 PM",
            location: "Room 302",
            description: "Learn advanced React patterns"
        },
        {
            title: "Workshop: Swift Event",
            date: "May 13, 2024",
            time: "5:00 PM",
            location: "Room 101",
            description: "Learn Swift!"
        }
    ];

    const displayEvents = events.length > 0 ? events : defaultEvents;

    return (
        <div className={cn(
            "w-255 h-80 rounded-xl shadow-xl bg-[#19191c] p-6", // Added h-80 here
            "transition-all duration-300 hover:shadow-2xl", // Removed scale transform
            " overflow-hidden flex flex-col", // Added flex-col
            className
        )}>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">Upcoming Events</h2>
            </div>

            <div className="flex-1 overflow-y-hidden pr-2"> {/* Added scrolling container */}
                <div className="space-y-3">
                    {displayEvents.map((event, index) => (
                        <div
                            key={index}
                            className="p-3 rounded-lg bg-black hover:bg-gray-800/70 transition-colors"
                        >
                            <div className="flex justify-between items-start">
                                <h3 className="font-medium text-white text-sm">{event.title}</h3>
                                <span className="text-xs px-2 py-1 bg-[#19191c] text-white rounded-full">
                  Upcoming
                </span>
                            </div>

                            {event.description && (
                                <p className="text-xs text-gray-400 mt-1">{event.description}</p>
                            )}

                            <div className="mt-2 grid grid-cols-2 gap-1 text-xs">
                                <div className="flex items-center text-gray-300">
                                    <CalendarDays className="h-3 w-3 mr-1 text-gray-400" />
                                    {event.date}
                                </div>
                                <div className="flex items-center text-gray-300">
                                    <Clock className="h-3 w-3 mr-1 text-gray-400" />
                                    {event.time}
                                </div>
                                <div className="flex items-center text-gray-300 col-span-2">
                                    <MapPin className="h-3 w-3 mr-1 text-gray-400" />
                                    {event.location}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}