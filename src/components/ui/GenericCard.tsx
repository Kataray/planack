"use client";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils.ts";

interface CardProps {
    label: string;
    title: string;
    subtitle: string;
    icon?: React.ReactNode;
    className?: string;
}

export default function Card({ label, title, subtitle, icon, className }: CardProps) {
    return (
        <div className="w-full ml-0">
            <div
                className={cn(
                    "aspect-[3/2] rounded-xl shadow-xl bg-[#19191c] p-6 flex flex-col justify-between",
                    "transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl",
                    className
                )}
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-gray-400 leading-tight truncate">{label}</p>
                    <div className="shrink-0 bg-[#000000] p-2 rounded-full flex items-center justify-center h-9 w-9">
                        {icon || <CalendarIcon className="text-white h-5 w-5" />}
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-xl font-bold text-white leading-snug truncate mb-1">
                    {title}
                </h1>

                {/* Subtitle */}
                <p className="text-gray-300 text-sm truncate">{subtitle}</p>
            </div>
        </div>
    );
}
