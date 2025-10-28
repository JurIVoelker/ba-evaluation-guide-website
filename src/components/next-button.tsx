import { useMainStore } from "@/store/main-store";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const NextButton = ({
  onClick = null,
  className,
}: {
  onClick?: (() => void) | null;
  className?: string;
}) => {
  const { progress, setActiveStep } = useMainStore();

  return (
    <Button
      onClick={() => {
        if (onClick === null) setActiveStep(progress);
        else onClick();
      }}
      className={cn("mt-8", className)}
    >
      Weiter <ArrowRight />
    </Button>
  );
};

export default NextButton;
