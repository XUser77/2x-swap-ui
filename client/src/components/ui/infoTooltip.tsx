"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

type InfoTooltipProps = {
  content: string;
};

export function InfoTooltip({ content }: InfoTooltipProps) {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            className="m-1 inline-flex items-center text-gray-400 hover:text-gray-600"
          >
            <Info className="w-3 h-3" />
          </button>
        </TooltipTrigger>

        <TooltipContent
          sideOffset={6}
          className="max-w-xs bg-blue-950 text-white [&>svg]:hidden"
        >
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
