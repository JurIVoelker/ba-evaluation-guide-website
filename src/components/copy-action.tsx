import { cn } from "@/lib/utils";
import {
  Check,
  File,
  Palette,
  SquareCode,
  SquareTerminalIcon,
} from "lucide-react";
import { useState, ComponentType } from "react";

const CopyAction = ({
  children,
  Icon,
}: {
  children: string;
  Icon: ComponentType<{ className?: string }>;
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const onCopy = () => {
    setShowTooltip(true);
    navigator.clipboard.writeText(children);
    setTimeout(() => setShowTooltip(false), 700);
  };
  return (
    <span className="relative">
      <span
        className={cn(
          "absolute bg-accent-foreground text-card top-[-1.8rem] rounded-sm text-sm px-1.5 pr-2 py-0.5 transition-opacity inline-flex items-center gap-1 opacity-0 left-[calc(50%-2.5rem)] shadow-md pointer-events-none",
          showTooltip && "opacity-100"
        )}
      >
        <Check className="size-3.5" />
        Kopiert
      </span>
      <button
        className="inline-flex items-center gap-1.5 hover:opacity-70 transition-opacity bg-secondary cursor-pointer text-card-foreground border rounded-sm px-1.5 font-mono relative top-[0.2rem] pr-2"
        onClick={onCopy}
      >
        <Icon className="size-4 text-card-foreground/50" />
        {children}
      </button>
    </span>
  );
};

export const CommandCopy = ({ children }: { children: string }) => {
  return <CopyAction Icon={SquareTerminalIcon}>{children}</CopyAction>;
};

export const CodeCopy = ({ children }: { children: string }) => {
  return <CopyAction Icon={SquareCode}>{children}</CopyAction>;
};

export const FileCopy = ({ children }: { children: string }) => {
  return <CopyAction Icon={File}>{children}</CopyAction>;
};

export const ColorCopy = ({ children }: { children: string }) => {
  return <CopyAction Icon={Palette}>{children}</CopyAction>;
};
