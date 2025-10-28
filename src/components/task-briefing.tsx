import CodeCopy from "./code-copy";
import ColorCopy from "./color-copy";

const TaskBriefing = ({
  variant,
  filePrefix,
}: {
  variant: "contained" | "default";
  filePrefix: "material" | "shadcn";
}) => {
  return (
    <>
      <h2 className="mt-10 mb-1">1. Anpassung einer Variante</h2>
      <p>
        Die Variante &quot;{variant}&quot; der Button-Komponente soll angepasst
        werden. Dafür soll die Hintergrundfarbe auf den Wert{" "}
        <ColorCopy color="FF0000" /> gesetzt werden.
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
        werden. Diese soll angezeigt wenn die Prop <code>loading</code> gesetzt
        ist.
      </p>
      <p>
        Für die Ladeanimation soll die Komponente{" "}
        <code>{`<PulseLoader color="white" size={8} />`}</code>
        {" der Bibliothek "}
        <code>{`import { PulseLoader } from "react-spinners";`}</code> verwendet
        werden. Außerdem soll der Button während des Ladens deaktiviert (
        <code>disabled</code>) sein.
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
        werden. Diese soll die Hintergrundfarbe <ColorCopy color="0015D4" />{" "}
        haben, der Text soll weiß sein und auf der rechten Seite soll ein
        Sende-Icon angezeigt werden. Dafür soll das Icon{" "}
        <code>{`<SendIcon className="size-4" />`}</code> {" der Bibliothek "}
        <code>{`import { SendIcon } from "lucide-react";`}</code> verwendet
        werden.
      </p>
      <p className="mt-2">Unter Verwendung des folgenden Codes:</p>
      <CodeCopy className="my-2">{`<Button variant="send">Hallo</Button>`}</CodeCopy>
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
