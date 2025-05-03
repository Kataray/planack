import { useState } from "react";
import { tasks as initialTasks } from "@/components/data/Tasks.ts";

const categories = ["Productivity", "Finance"];

export default function TaskList() {
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [tasks, setTasks] = useState(initialTasks);

    const filtered = tasks.filter(task => task.category === selectedCategory);

    const toggleComplete = (id: number) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    return (
        <div className="mt-10 ml-10 mr-10">
            <div className="flex space-x-4 mb-4">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                            cat === selectedCategory ? "bg-blue-500 text-white" : "bg-gray-800 text-white"
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="bg-[#19191c] rounded-xl shadow-xl p-4 overflow-x-auto">
                <table className="w-full text-sm text-white">
                    <thead>
                    <tr className="border-b border-gray-700 text-left">
                        <th className="p-2">Task</th>
                        <th className="p-2">Completed</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filtered.map(task => (
                        <tr key={task.id} className="border-b border-gray-800 hover:bg-[#2a2a2a] transition">
                            <td className="p-2">{task.title}</td>
                            <td className="p-2">
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => toggleComplete(task.id)}
                                    className="accent-blue-500 h-4 w-4"
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
