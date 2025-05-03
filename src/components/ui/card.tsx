"use client";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils.ts";

export default function CardDemo() {
  return (
      <div className="max-w-sm w-full mx-auto mt-5 ml-10">
        <div
            className={cn(
                "relative rounded-xl shadow-xl bg-[#19191c] p-6 flex flex-col gap-4"
            )}
        >
          {/* Header */}
          <p className="text-sm text-gray-400">Planning for</p>

          {/* Title and Date */}
          <div>
            <h1 className="text-2xl font-bold -mt-3 text-white">UwinHacks<br/>2025</h1>
            <p className="text-gray-300 mt-2">Nov 22 - Nov 25, 10am</p>

          </div>

          {/* Calendar Icon */}
          <div className="absolute top-6 right-6 bg-[#000000] p-2 rounded-full">
            <CalendarIcon className="text-white h-8 w-8" />
          </div>
        </div>
      </div>
  );
}
