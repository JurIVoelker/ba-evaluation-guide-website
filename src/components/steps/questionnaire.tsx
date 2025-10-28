import { useMainStore } from "@/store/main-store";
import CodeCopy from "../code-copy";
import { buttonVariants } from "../ui/button";
import Link from "next/link";
import { Link2 } from "lucide-react";
import NextButton from "../next-button";
import { cn } from "@/lib/utils";

const Questionnaire = () => {
  const { uuid, setProgress, setActiveStep } = useMainStore();

  return (
    <div>
      <h1>Fragebogen</h1>
      <p>
        Du hast den letzten Schritt erreicht. Jetzt steht nur noch eine kurze
        Umfrage an. Damit die Umfrage mit deinen anderen Ergebnissen verknüpft
        werden kann, kopiere bitte die Id und gib sie zu Beginn der Umfrage ein.
      </p>
      <div className="flex gap-4 max-w-2xl mb-8 my-4">
        {uuid && <CodeCopy className="grow">{uuid}</CodeCopy>}
        {!uuid && (
          <p className="text-destructive">
            Es ist ein Fehler aufgetreten. Du hast noch keine Id.
          </p>
        )}
        <Link
          href={process.env.NEXT_PUBLIC_SURVEY_URL || ""}
          className={cn(buttonVariants({ variant: "default" }))}
          target="_blank"
        >
          Zur Umfrage <Link2 />
        </Link>
      </div>
      <p>Wenn du die Umfrage abgeschlossen hast, klicke auf den Button:</p>
      <NextButton
        className="mt-2"
        onClick={() => {
          setProgress("done");
          setActiveStep("done");
        }}
      />
    </div>
  );
};

export default Questionnaire;
