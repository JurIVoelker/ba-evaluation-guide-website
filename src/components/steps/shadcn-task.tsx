import { useTaskStore1, useTaskStore2 } from "@/store/task-store";
import TaskMenu from "../task-menu";
import { cn } from "@/lib/utils";
import TaskInfo from "../task-info";
import TaskBriefing from "../task-briefing";

const ShadcnTask = ({
  store,
  isReady,
}: {
  store: typeof useTaskStore1 | typeof useTaskStore2;
  isReady: boolean;
}) => {
  const { isPaused, totalSeconds, startTime } = store();
  const isFinished = totalSeconds !== null;

  const errorContent = <p>Fehler: Noch nicht bereit für diesen Schritt</p>;
  const content = (
    <>
      <TaskBriefing variant="default" filePrefix="shadcn" />
    </>
  );

  return (
    <>
      <div className="pb-20">
        <h1>Shadcn</h1>
        <TaskInfo
          isPaused={isPaused}
          isFinished={isFinished}
          isReady={isReady}
          startTime={startTime}
          className="sticky top-4 z-10"
        />
        {!isFinished && !isReady ? (
          errorContent
        ) : (
          <div className={cn((isPaused || isFinished) && "opacity-20")}>
            {content}
          </div>
        )}
      </div>
      <div className="relative">
        <TaskMenu store={store} />
      </div>
    </>
  );
};

export default ShadcnTask;
