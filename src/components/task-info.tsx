import ConfirmAlert from "./alert/confirm-alert";
import InfoAlert from "./alert/info-alert";

const TaskInfo = ({
  isFinished,
  isReady,
  startTime,
  isPaused,
}: {
  isFinished: boolean;
  isReady: boolean;
  startTime: Date | null;
  isPaused: boolean;
}) => {
  return (
    <>
      {isFinished && (
        <ConfirmAlert className="mt-2 mb-4">
          Du hast die Aufgabe erfolgreich abgeschlossen! Fahre fort mit dem
          nächsten Schritt.
        </ConfirmAlert>
      )}
      {!isFinished && isReady && startTime === null && (
        <InfoAlert className="mt-2 mb-4">
          Lese dir die Aufgaben sorgfältig durch. Sobald du bereit bist, zu
          recherchieren oder zu programmieren, klicke auf &quot;Starten&quot;.
        </InfoAlert>
      )}
      {!isFinished && isReady && startTime !== null && (
        <InfoAlert className="mt-2 mb-4">
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
