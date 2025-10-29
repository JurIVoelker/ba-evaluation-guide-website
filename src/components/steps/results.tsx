import { useEffect, useState } from "react";
import CodeCopy from "../code-copy";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { TriangleAlert } from "lucide-react";
import { useMainStore } from "@/store/main-store";
import { useTaskStore1, useTaskStore2 } from "@/store/task-store";
import { cn } from "@/lib/utils";
import ConfirmAlert from "../alert/confirm-alert";
import { FileCopy } from "../copy-action";

const CodeStep = ({ ...props }) => {
  const [id, setId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setUUID, group, uuid, setProgress, setActiveStep, progress } =
    useMainStore();
  const task1Store = useTaskStore1();
  const task2Store = useTaskStore2();

  useEffect(() => {
    if (uuid) setId(uuid);
  }, [uuid]);

  const isActive = progress === "uploading";

  const onClick = async () => {
    setError("");
    setLoading(true);
    try {
      if (!id.trim()) throw new Error("Bitte eine Id eingeben");

      const idRegex =
        /^(?:A_|B_)[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!idRegex.test(id.trim())) {
        throw new Error(
          "Ungültige ID. Kopiere die vollständige ID und versuche es erneut. Die ID besteht aus einem Buchstaben (A_ oder B_) gefolgt von einer UUID."
        );
      }

      setUUID(id.trim());

      const task1Data = {
        startTime: task1Store.startTime,
        pauseMillis: task1Store.pauseMillis,
        totalSeconds: task1Store.totalSeconds,
        isPaused: task1Store.isPaused,
      };

      const task2Data = {
        startTime: task2Store.startTime,
        pauseMillis: task2Store.pauseMillis,
        totalSeconds: task2Store.totalSeconds,
        isPaused: task2Store.isPaused,
      };

      const data = { task1Data, task2Data, group, id: id.trim() };
      const response = await fetch("/api/upload-time", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(
          `Fehler beim Hochladen der Daten: ${response.statusText}`
        );
      }
      setProgress("questionnaire");
      setActiveStep("questionnaire");
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!isActive && (
        <ConfirmAlert className="mb-4">
          Du hast deine Ergebnisse erfolgreich hochgeladen. Fahre mit dem
          Fragebogen fort.
        </ConfirmAlert>
      )}
      <div {...props} className={cn(!isActive && "opacity-25")}>
        <p>
          Um den Code hochzuladen, führe folgendes Kommando in dem
          Container-Terminal aus:
        </p>
        <CodeCopy className="my-4">{`bun upload-results -g ${group}`}</CodeCopy>
        <p>
          Am Ende des Kommandos, wird eine Id zurückgegeben. Diese wird außerdem
          in der Datei <FileCopy>id.txt</FileCopy> gespeichert. Kopiere diese Id
          und füge sie in das folgende Feld ein:
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onClick();
          }}
        >
          <Input
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="my-4 max-w-2xl"
            placeholder="Id eingeben"
            disabled={!isActive || loading}
          />
          {error && (
            <p className="text-destructive mb-4 flex items-center gap-2">
              <TriangleAlert className="size-4 shrink-0" />
              {error}
            </p>
          )}
          <p className="mb-4">
            Klicke auf den Button um die restlichen Daten zu speichern:
          </p>
          <Button
            loading={loading}
            disabled={loading || !id || !isActive}
            loadingText="Speichern"
            type="submit"
            className={cn(!loading && id && isActive && "outline-pulse")}
          >
            Weiter
          </Button>
        </form>
      </div>
    </>
  );
};

const Results = () => {
  return (
    <div>
      <h1>Ergebnisse Hochladen</h1>
      <CodeStep key={0} />
    </div>
  );
};

export default Results;
