import { useMainStore } from "@/store/main-store";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

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
      className={className}
    >
      Weiter <ArrowRight />
    </Button>
  );
};

export default NextButton;
