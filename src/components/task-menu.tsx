import { useTaskStore1, useTaskStore2 } from "@/store/task-store";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Check, Flag, Pause, Play } from "lucide-react";
import { Card } from "./ui/card";
import { formatDuration } from "date-fns";
import { de } from "date-fns/locale/de";
import ConfirmDialog from "./confirm-modal";
import { cn } from "@/lib/utils";
import NextButton from "./next-button";
const TaskMenu = ({
  store,
}: {
  store: typeof useTaskStore1 | typeof useTaskStore2;
}) => {
  const { start, isPaused, pause, finish, resume, totalSeconds, startTime } =
    store();

  const executeStoreAction = (action: () => void) => {
    try {
      action();
    } catch (error) {
      if (!(error instanceof Error)) throw error;
      toast.error("Fehler: " + error.message);
    }
  };

  const onStart = () => executeStoreAction(start);
  const onPause = () => executeStoreAction(pause);
  const onFinish = () => executeStoreAction(finish);
  const onResume = () => executeStoreAction(resume);

  const isStarting =
    (totalSeconds === null && startTime === null) ||
    (totalSeconds === undefined && startTime === undefined);
  const isFinished = totalSeconds !== null;
  let content = null;

  if (isFinished) {
    content = (
      <div className="text-sm flex items-center gap-2 ">
        <span className="bg-emerald-100 p-1 rounded-md">
          <Check className="size-4 text-emerald-700" />
        </span>
        Abgeschlossen in{" "}
        {formatDuration(
          {
            seconds: totalSeconds % 60,
            minutes: Math.floor(totalSeconds / 60),
          },
          { locale: de, format: ["minutes", "seconds"] }
        )}{" "}
        <NextButton className="ml-1 outline-pulse mt-0" />
      </div>
    );
  } else if (isStarting) {
    content = (
      <Button
        onClick={onStart}
        disabled={totalSeconds !== null || startTime !== null}
        className="outline-pulse"
      >
        Starten
      </Button>
    );
  } else {
    content = (
      <>
        <Button
          onClick={isPaused ? onResume : onPause}
          variant="outline"
          className={cn("z-20", isPaused && "outline-pulse")}
        >
          {isPaused ? (
            <>
              <Play />
              Weiter
            </>
          ) : (
            <>
              <Pause /> Pausieren
            </>
          )}
        </Button>
        <ConfirmDialog onConfirm={onFinish}>
          <Button data-test-id="finish-task-button">
            <Flag />
            Fertig
          </Button>
        </ConfirmDialog>
      </>
    );
  }

  return (
    <div className="fixed bottom-4 w-[calc(100%-var(--sidebar-width))] flex justify-center left-[calc(var(--sidebar-width)-2rem)] pointer-events-none z-50">
      <Card className="p-4 box-border flex justify-center flex-row gap-3 relative pointer-events-auto">
        {content}
      </Card>
    </div>
  );
};

export default TaskMenu;
