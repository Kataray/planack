"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils.ts";

interface Person {
    name: string;
    phone: string;
    email: string;
}

interface PeopleGroup {
    group: string;
    people: Person[];
}

interface CardProps {
    className?: string;
}

export default function Card({ className }: CardProps) {
    const [data, setData] = useState<PeopleGroup[]>([]);

    useEffect(() => {
        import("@/components/data/People.json")
            .then((module) => {
                setData(module.default);
            })
            .catch(console.error);
    }, []);

    const group = data[0]; // always use the first group

    return (
        <div className="w-100 pr-5 pb-5">
            <div
                className={cn(
                    "h-65 rounded-xl shadow-xl bg-[#19191c] p-6 flex flex-col justify-between",
                    "transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl",
                    className
                )}
            >
                <h2 className="text-white text-lg font-bold mb-3">Team Members</h2>

                {group && (
                    <ul className="space-y-2">
                        {group.people.slice(0, 3).map((person, idx) => (
                            <li key={idx} className="text-sm text-white">
                                <p className="font-semibold">{person.name}</p>
                                <p className="text-gray-400">{person.phone}</p>
                                <p className="text-gray-400">{person.email}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
