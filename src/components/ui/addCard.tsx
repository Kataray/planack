"use client";
import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils.ts";

interface AddCardProps {
    onClick: () => void;
}

export default function AddCard({ onClick }: AddCardProps) {
    return (
        <div
            onClick={onClick}
            className={cn(
                "flex-1 min-w-0 h-44 rounded-xl shadow-xl bg-[#19191c] p-8 flex flex-col justify-center items-center gap-6 cursor-pointer transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl"
            )}
        >
            <div className="bg-[#19191c] rounded-full">
                <PlusIcon className="text-white h-10 w-10" />
            </div>
        </div>
    );
}

