"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils.ts";

interface Task {
    name: string;
    done: boolean;
}

interface TaskGroup {
    group: string;
    tasks: Task[];
}

interface ChecklistCardProps {
    className?: string;
}

export default function ChecklistCard({ className }: ChecklistCardProps) {
    const [data, setData] = useState<TaskGroup[]>([]);
    const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

    useEffect(() => {
        import('@/components/data/Tasks.json')
            .then((module) => {
                setData(module.default);
                // Set the first group as the default selected one
                if (module.default.length > 0) {
                    setSelectedGroup(module.default[0].group);
                }
            })
            .catch(console.error);
    }, []);

    // Handle changing selected group
    const handleGroupChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedGroup(event.target.value);
    };

    return (
        <div className="w-110 ml-10 mt-8">
            <div
                className={cn(
                    "rounded-xl shadow-xl bg-[#19191c] p-6",
                    "transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl",
                    className,
                    "h-50"
                )}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-white text-lg font-bold">Task Checklist</h2>

                    {/* Dropdown to select task group (top-right corner) */}
                    <div className="relative">
                        <select
                            id="task-group"
                            className="w-36 p-2 bg-black text-white rounded-md absolute top-0 right-0"
                            onChange={handleGroupChange}
                            value={selectedGroup || ""}
                        >
                            <option value="">Select a group</option>
                            {data.map((group) => (
                                <option key={group.group} value={group.group}>
                                    {group.group}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Display the selected group */}
                {selectedGroup && (
                    <div className="overflow-y-auto h-[calc(100%-60px)]"> {/* Ensure that content scrolls if needed */}
                        {data
                            .filter((group) => group.group === selectedGroup)
                            .map((group) => (
                                <div key={group.group} className="mb-4">
                                    <p className="text-sm text-gray-400 mb-1">{group.group}</p>
                                    <ul className="space-y-1">
                                        {/* Display up to 3 tasks */}
                                        {group.tasks.slice(0, 3).map((task, idx) => (
                                            <li key={idx} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={task.done}
                                                    disabled
                                                    className="mr-2 accent-green-500"
                                                />
                                                <span
                                                    className={`text-sm ${task.done ? "text-gray-400 line-through" : "text-white"}`}
                                                >
                                                    {task.name}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
}
