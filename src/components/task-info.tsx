import ConfirmAlert from "./alert/confirm-alert";
import InfoAlert from "./alert/info-alert";

const TaskInfo = ({
  isFinished,
  isReady,
  startTime,
  isPaused,
  className,
}: {
  isFinished: boolean;
  isReady: boolean;
  startTime: Date | null;
  isPaused: boolean;
  className?: string;
}) => {
  const globalStyles = `pointer-events-auto ${className}`;

  return (
    <div
      className="sticky top-0 z-10 max-w-2xl pt-4 pb-10 pointer-events-none"
      style={{
        background:
          "linear-gradient(to bottom, rgba(232,235,237, 0.80) 0%, rgba(232,235,237, 0.60) 70%, rgba(232,235,237, 0) 100%)",
      }}
    >
      {isFinished && (
        <ConfirmAlert className={globalStyles}>
          Du hast die Aufgabe erfolgreich abgeschlossen! Fahre fort mit dem
          nächsten Schritt.
        </ConfirmAlert>
      )}
      {!isFinished && isReady && startTime === null && (
        <InfoAlert className={globalStyles}>
          Lese dir die Aufgaben sorgfältig durch. Sobald du bereit bist, zu
          recherchieren oder zu programmieren, klicke unten auf
          &quot;Starten&quot;. <strong>Nicht vergessen!</strong>
        </InfoAlert>
      )}
      {!isFinished && isReady && startTime !== null && (
        <InfoAlert className={globalStyles}>
          {!isPaused && (
            <>
              Erledige die Aufgaben. Sobald du fertig bist, klicke auf
              &quot;Fertig&quot;. Falls du eine Pause machen möchtest, klicke
              auf &quot;Pause&quot;.
            </>
          )}
          {isPaused && (
            <>
              Die Aufgabe ist pausiert. Klicke auf &quot;Weiter&quot;, um
              fortzufahren.
            </>
          )}
        </InfoAlert>
      )}
    </div>
  );
};

export default TaskInfo;
