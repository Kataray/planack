"use client";

import {useEffect, useState} from "react";
import Sidebar from "src/components/Navbar/Sidebar";
import AddCard from "src/components/ui/addCard";
import { Checkbox } from "@/components/ui/checkbox";
import saveTask from 'src/components/data/saveTask.json';


interface Task {
    id: number;
    text: string;
    completed: boolean;
}

interface TaskGroup {
    id: number;
    name: string;
    tasks: Task[];
}

export default function TaskBoard() {
    // Load from localStorage OR fallback to JSON initial data
    const [groups, setGroups] = useState<TaskGroup[]>(() => {
        const saved = localStorage.getItem('taskGroups');
        return saved ? JSON.parse(saved) : saveTask.groups;
    });

    // Save to localStorage whenever groups change
    useEffect(() => {
        localStorage.setItem('taskGroups', JSON.stringify(groups));
    }, [groups]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [groupName, setGroupName] = useState("");


    const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
    const [taskInput, setTaskInput] = useState("");

    const openPopup = () => {
        setGroupName("");
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const createGroup = () => {
        if (!groupName.trim()) return;
        const newGroup: TaskGroup = {
            id: Date.now(),
            name: groupName.trim(),
            tasks: [],
        };
        setGroups([...groups, newGroup]);
        closePopup();
    };

    const deleteTask = (groupId: number, taskId: number) => {
        setGroups(groups.map(group =>
            group.id === groupId
                ? {
                    ...group,
                    tasks: group.tasks.filter(task => task.id !== taskId)
                }
                : group
        ));
    };


    const addTaskToGroup = () => {
        if (!taskInput.trim() || selectedGroupId === null) return;
        const newTask: Task = {
            id: Date.now(),
            text: taskInput.trim(),
            completed: false,
        };
        setGroups(groups.map((group) =>
            group.id === selectedGroupId
                ? { ...group, tasks: [...group.tasks, newTask] }
                : group
        ));
        setTaskInput("");
    };

    const toggleTaskCompletion = (groupId: number, taskId: number) => {
        setGroups(groups.map((group) =>
            group.id === groupId
                ? {
                    ...group,
                    tasks: group.tasks.map((task) =>
                        task.id === taskId ? { ...task, completed: !task.completed } : task
                    ),
                }
                : group
        ));
    };

    return (
        <div className="flex min-h-screen w-screen bg-black text-white">
            <Sidebar />

            <div className="flex-1 mr-10">
                <h1 className="font-cal text-[4vh] ml-10 mt-7">Tasks</h1>
                <h2 className="font-cal text-[2.5vh] ml-10 -mt-2">Keep tasks in order and plan</h2>

                <div className="flex flex-wrap gap-6 ml-10 mt-8">
                    {[...groups, { id: -1, name: "__add_card__", tasks: [] }].map((group) => (
                        <div
                            key={group.id}
                            className="w-60 h-44 cursor-pointer"
                            onClick={() => {
                                if (group.id !== -1) setSelectedGroupId(group.id);
                            }}
                        >
                            {group.name === "__add_card__" ? (
                                <AddCard onClick={openPopup} />
                            ) : (
                                <div className="w-full h-full bg-[#19191c] p-8 rounded-xl shadow-xl text-white flex justify-between">
                                    <h2 className="text-lg font-semibold">{group.name}</h2>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Create Group Popup */}
                {isPopupOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-[#19191c] p-6 rounded-lg shadow-lg w-full max-w-md text-white">
                            <h2 className="text-xl font-bold mb-4">Create Task Group</h2>
                            <input
                                className="w-full border rounded p-2 mb-4 text-white"
                                placeholder="Group name"
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                            />
                            <div className="flex justify-end gap-2 mt-6">
                                <button
                                    className="px-4 py-2 border !bg-[#19191c] !text-white rounded hover:bg-neutral-900"
                                    onClick={closePopup}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-4 py-2 border  !bg-[#19191c] !text-white rounded hover:bg-neutral-900"
                                    onClick={createGroup}
                                >
                                    Create Group
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Task Manager Popup */}
                {selectedGroupId !== null && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-[#19191c] p-6 shadow-lg w-full max-w-md text-white">

                            <h2 className="text-xl font-bold mb-3">Tasks for this Group </h2>


                            <ul className="space-y-3 mb-4">
                                {groups
                                    .find((g) => g.id === selectedGroupId)
                                    ?.tasks.map((task) => (
                                        <li key={task.id} className="flex items-center justify-between !rounded-none">
                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    checked={task.completed}
                                                    onCheckedChange={() =>
                                                        toggleTaskCompletion(selectedGroupId, task.id)
                                                    }
                                                />
                                                <span className={`${task.completed ? "line-through text-gray-400" : ""}`}>
            {task.text}
        </span>
                                            </div>
                                            <button
                                                onClick={() => deleteTask(selectedGroupId, task.id)}
                                                className="!bg-[#19191c] text-white hover:text-black text-sm ml-2"
                                            >
                                                Delete
                                            </button>
                                        </li>

                                    ))}
                            </ul>

                            <div className="flex gap-2">
                                <input
                                    className="w-full border p-2 text-white"
                                    placeholder="New Task"
                                    value={taskInput}
                                    onChange={(e) => setTaskInput(e.target.value)}
                                />
                                <button
                                    onClick={addTaskToGroup}
                                    className="px-4 py-2  !bg-[#19191c] rounded hover:bg-neutral-800"
                                >
                                    Add
                                </button>

                            </div>

                            <div className="flex justify-end mt-4">
                                <button
                                    onClick={() => {
                                        setSelectedGroupId(null);
                                        setTaskInput("");
                                    }}
                                    className="px-4 py-2 border !bg-[#19191c] rounded hover:bg-neutral-800"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
