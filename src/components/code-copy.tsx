import { useId, useRef, useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function CodeCopy({
  children,
  className,
  ...props
}: {
  children: string;
  className?: string;
}) {
  const id = useId();
  const [copied, setCopied] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCopy = () => {
    if (inputRef.current) {
      navigator.clipboard.writeText(inputRef.current.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className={cn(className)} {...props}>
      <Label htmlFor={id} className="hidden">
        Copy to clipboard
      </Label>
      <div className="relative">
        <Input
          ref={inputRef}
          id={id}
          className="pe-9"
          type="text"
          defaultValue={children}
          readOnly
        />
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleCopy}
                className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 transition-[color,box-shadow] outline-none hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed"
                aria-label={copied ? "Copied" : "Copy to clipboard"}
                disabled={copied}
              >
                <div
                  className={cn(
                    "transition-all",
                    copied ? "scale-100 opacity-100" : "scale-0 opacity-0"
                  )}
                >
                  <CheckIcon
                    className="stroke-emerald-500"
                    size={16}
                    aria-hidden="true"
                  />
                </div>
                <div
                  className={cn(
                    "absolute transition-all",
                    copied ? "scale-0 opacity-0" : "scale-100 opacity-100"
                  )}
                >
                  <CopyIcon size={16} aria-hidden="true" />
                </div>
              </button>
            </TooltipTrigger>
            <TooltipContent className="px-2 py-1 text-xs">
              Kopieren
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
