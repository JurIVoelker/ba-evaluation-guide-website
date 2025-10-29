import Link from "next/link";
import CodeCopy from "./code-copy";
import { ColorCopy, CommandCopy, FileCopy } from "./copy-action";
import { CodeCopy as InlineCodeCopy } from "./copy-action";
import { FilePen } from "lucide-react";

const TaskBriefing = ({
  variant,
  filePrefix,
}: {
  variant: "contained" | "default";
  filePrefix: "material" | "shadcn";
}) => {
  const subFolder = filePrefix === "material" ? "mui" : "shadcn";
  return (
    <>
      <h2 className="mt-6 mb-1">Vorbereitung</h2>
      <p>
        Navigiere im VS-Code-Terminal in den passenden Unterordner und starte
        den Entwicklungsserver mit{" "}
        <CommandCopy>{`cd ${subFolder} && bun dev`}</CommandCopy>. Jetzt kannst
        du die Seite in deinem Browser unter{" "}
        <Link href="http://localhost:3000" target="_blank">
          http://localhost:3000
        </Link>{" "}
        erreichen.
      </p>

      <p>
        Dort wird die Datei{" "}
        <FileCopy>{`${subFolder}/src/pages/index.tsx`}</FileCopy> gerendert. In
        dieser wird auch die Button-Komponente verwendet, die angepasst werden
        soll.
      </p>
      <h2 className="mt-10 mb-1">1. Anpassung einer Variante</h2>
      <p>
        Die Variante &quot;{variant}&quot; der Button-Komponente soll angepasst
        werden. Dafür soll die Hintergrundfarbe auf den Wert{" "}
        <ColorCopy>#FF0000</ColorCopy> gesetzt werden.
      </p>
      <p className="mt-2">Unter Verwendung des folgenden Codes:</p>
      <CodeCopy className="my-2">{`<Button variant="${variant}">Hallo</Button>`}</CodeCopy>
      <p>Sollte deine Komponente so aussehen:</p>
      <img
        src={`/${filePrefix}-button-1.png`}
        className="bg-slate-50 rounded-md overflow-hidden w-40 mt-2"
      />
      <h2 className="mt-10 mb-1">2. Ladeanimation hinzufügen</h2>
      <p>
        Als nächstes soll die Button-Komponente um eine Ladeanimation erweitert
        werden. Diese soll angezeigt wenn die Prop{" "}
        <InlineCodeCopy>loading</InlineCodeCopy> gesetzt ist.
      </p>
      <p>
        Für die Ladeanimation soll die Komponente{" "}
        <InlineCodeCopy>{`<PulseLoader color="white" size={8} />`}</InlineCodeCopy>
        {" der Bibliothek "}
        <InlineCodeCopy>{`import { PulseLoader } from "react-spinners";`}</InlineCodeCopy>{" "}
        verwendet werden. Außerdem soll der Button während des Ladens
        deaktiviert (<InlineCodeCopy>disabled</InlineCodeCopy>) sein.
      </p>
      <p className="mt-2">Unter Verwendung des folgenden Codes:</p>
      <CodeCopy className="my-2">{`<Button variant="${variant}" loading>Hallo</Button>`}</CodeCopy>
      <p>Sollte deine Komponente so aussehen (mit Animation):</p>
      <img
        src={`/${filePrefix}-button-2.png`}
        className="bg-slate-50 rounded-md overflow-hidden w-40 mt-2"
      />
      <h2 className="mt-10 mb-1">3. Neue Variante hinzufügen</h2>
      <p>
        Die Variante &quot;send&quot; soll der Button-Komponente hinzugefügt
        werden. Diese soll die Hintergrundfarbe <ColorCopy>#0015D4</ColorCopy>{" "}
        haben, der Text soll weiß sein und auf der rechten Seite soll ein
        Sende-Icon angezeigt werden. Dafür soll das Icon{" "}
        <InlineCodeCopy>{`<SendIcon className="size-4" />`}</InlineCodeCopy>{" "}
        {" der Bibliothek "}
        <InlineCodeCopy>{`import { SendIcon } from "lucide-react";`}</InlineCodeCopy>{" "}
        verwendet werden.
      </p>
      <p className="mt-2">Unter Verwendung des folgenden Codes:</p>
      <CodeCopy className="my-2">{`<Button variant="send">${
        filePrefix === "material" ? "Senden" : "Hallo"
      }</Button>`}</CodeCopy>
      <p>Sollte deine Komponente so aussehen:</p>
      <img
        src={`/${filePrefix}-button-3.png`}
        className="bg-slate-50 rounded-md overflow-hidden w-40 mt-2"
      />
      <h2 className="mt-10 mb-1">4. Fertig</h2>
      <p>Klicke jetzt auf den Fertig-Button und fahre fort.</p>
    </>
  );
};

export default TaskBriefing;
