import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Checkbox({
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
      <CheckboxPrimitive.Root
          data-slot="checkbox"
          className={cn(
              "w-1 h-1 bg-white !rounded-none flex items-center justify-center", // ensure square & visible border
               // preserve passed-in className
          )}
          {...props}
      >
        <CheckboxPrimitive.Indicator
            data-slot="checkbox-indicator"
            className="flex items-center justify-center text-current transition-normal"
        >
          <CheckIcon className="size-5 bg-white text-black" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
  )

}

export { Checkbox }
