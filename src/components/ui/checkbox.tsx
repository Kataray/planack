import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function Checkbox({ checked, onCheckedChange }: { checked: boolean; onCheckedChange: () => void }) {
    return (
        <CheckboxPrimitive.Root
            checked={checked}
            onCheckedChange={onCheckedChange}
            className={cn(
                "w-3 h-6 border-2 !border-gray-400 rounded-md flex items-center justify-center !color-white transition-colors",
                checked ? "bg-blue-500 border-blue-500" : "bg-white",
                "hover:bg-blue-600 hover:border-blue-600"
            )}
        >
            <CheckboxPrimitive.Indicator>
                {/* The checkmark will be white when checked */}
                <CheckIcon className="w-4 h-4 text-white" />
            </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
    );
}

export { Checkbox };
