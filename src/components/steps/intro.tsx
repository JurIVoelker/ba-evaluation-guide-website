import { useEffect } from "react";
import NextButton from "../next-button";
import { useMainStore } from "@/store/main-store";

const Intro = () => {
  const { setProgress, progress, isReady } = useMainStore();

  useEffect(() => {
    if (isReady && progress === "intro") setProgress("setup");
  }, [isReady, progress, setProgress]);

  return (
    <div>
      <h1>Willkommen</h1>
      <p>
        Danke, dass du dir die Zeit nimmst, um die Evaluation durchzuführen!
        Diese Webseite leitet dich zuerst durch das Aufsetzen und dann durch die
        einzelnen Arbeitsschritte der Evaluation.
      </p>
      <h2 className="mt-4 mb-1">Motivation</h2>
      <p>
        In meiner Bachelorarbeit vergleiche ich die UI-Bibliotheken shadcn/ui
        {" und "}Material UI. Die Besonderheit von shadcn/ui ist, dass die
        oberste Schicht der UI-Komponenten in das Projekt kopiert wird. Dies
        ermöglicht es, den Quellcode der Komponenten direkt anzupassen. Ziel
        dieser Evaluation ist es herauszufinden, ob und wie sehr diese
        Anpassungsmöglichkeit die Entwicklungserfahrung und die Effizienz bei
        der Arbeit mit UI-Komponenten beeinflusst.
      </p>
      <h2 className="mt-4 mb-1">Ablauf</h2>
      <ol className="list-decimal list-inside space-y-1">
        <li>Aufsetzen der Entwicklungsumgebung</li>
        <li>
          Durchführung der Entwicklungsaufgabe mit der ersten UI-Bibliothek
        </li>
        <li>
          Durchführung derselben Entwicklungsaufgabe mit der zweiten
          UI-Bibliothek
        </li>
        <li>Ergebnisse hochladen</li>
        <li>Kurze Umfrage</li>
      </ol>
      <h2 className="mt-4 mb-1">Anonyme Ergebnisermittlung</h2>
      <p>Es werden folgende Daten erhoben:</p>
      <ul className="list-disc list-inside my-2 space-y-1">
        <li>Zeit für die Umsetzung der einzelnen Aufgaben</li>
        <li>Produzierter Code</li>
        <li>Ergebnisse aus Umfrage</li>
      </ul>
      <p>
        Alle Ergebnisse sind <strong>anonym</strong>, damit sich niemand unter
        Druck gesetzt fühlt. Ergebnisse einander zuordnen zu können, wird eine
        zufällige Id generiert.
      </p>
      <h2 className="mt-4 mb-1">Hinweise</h2>
      <ul className="list-disc list-inside my-2 space-y-1 max-w-2xl">
        <li>
          Bitte stelle sicher, dass du während der Evaluation ungestört bist und
          genügend Zeit hast, um alle Schritte sorgfältig durchzuführen
        </li>
        <li>Wenn du Pausen machst, pausiere den Timer</li>
        <li>
          Arbeite so, wie du normalerweise in einem Projekt auch arbeiten
          würdest. Du kannst also auch Hilfsmittel wie Google, KI oder
          Dokumentationen nutzen
        </li>
        <li>Wenn du Fragen hast, zögere nicht, mich zu kontaktieren</li>
      </ul>
      <NextButton className="mt-8" />
    </div>
  );
};

export default Intro;
