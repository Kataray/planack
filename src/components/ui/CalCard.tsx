"use client";
import { cn } from "@/lib/utils.ts";

interface CardProps {
    label: string;
    title: string;
    subtitle: string;
    icon?: React.ReactNode;
    className?: string;
}

export default function Card({ className }: CardProps) {
    return (
        <div className="w-full ml-2 mt-0 mr-0">
            <div
                className={cn(
                    "h-80 rounded-xl shadow-xl bg-[#19191c] p-6 flex flex-col justify-between",
                    "transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl",
                    className
                )}
            >

            </div>
        </div>
    );
}
