import { cn } from "@/lib/utils";
import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";

const ColorCopy = ({ color }: { color: string }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("#" + color);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      className={`relative px-1.5 py-0.5 rounded-sm pr-8 inline-flex justify-start`}
      style={{ backgroundColor: `#${color}` }}
      onClick={handleCopy}
      aria-label={copied ? "Copied" : "Copy to clipboard"}
      disabled={copied}
    >
      <span className="text-white">#{color}</span>
      <span className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 transition-[color,box-shadow] outline-none hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed">
        <div
          className={cn(
            "transition-all",
            copied ? "scale-100 opacity-100" : "scale-0 opacity-0"
          )}
        >
          <CheckIcon className="stroke-white" size={16} aria-hidden="true" />
        </div>
        <div
          className={cn(
            "absolute transition-all text-white",
            copied ? "scale-0 opacity-0" : "scale-100 opacity-100"
          )}
        >
          <CopyIcon size={16} aria-hidden="true" />
        </div>
      </span>
    </button>
  );
};

export default ColorCopy;
