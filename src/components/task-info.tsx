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
  return (
    <>
      {isFinished && (
        <ConfirmAlert className={`mt-2 mb-4 ${className}`}>
          Du hast die Aufgabe erfolgreich abgeschlossen! Fahre fort mit dem
          nächsten Schritt.
        </ConfirmAlert>
      )}
      {!isFinished && isReady && startTime === null && (
        <InfoAlert className={`mt-2 mb-4 ${className}`}>
          Lese dir die Aufgaben sorgfältig durch. Sobald du bereit bist, zu
          recherchieren oder zu programmieren, klicke unten auf
          &quot;Starten&quot;. <strong>Nicht vergessen!</strong>
        </InfoAlert>
      )}
      {!isFinished && isReady && startTime !== null && (
        <InfoAlert className={`mt-2 mb-4 ${className}`}>
          {!isPaused && (
            <>
              Erledige die Aufgaben. Sobald du fertig bist, klicke auf
              &quot;Fertig&quot;. Falls du eine Pause machen möchtest, klicke
              auf &quot;Pause&quot;.
            </>
          )}
          {isPaused && (
            <>
              Die Aufgabe ist pausiert. Klicke auf &quot;Fortsetzen&quot;, um
              fortzufahren.
            </>
          )}
        </InfoAlert>
      )}
    </>
  );
};

export default TaskInfo;
