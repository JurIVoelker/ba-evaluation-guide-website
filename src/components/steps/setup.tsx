import Link from "next/link";
import { useMainStore } from "@/store/main-store";
import { useEffect } from "react";
import NextButton from "../next-button";
import { Kbd } from "../ui/kbd";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import CodeCopy from "../code-copy";
import { CommandCopy, FileCopy } from "../copy-action";

const Debugging = () => {
  return (
    <>
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-1"
      >
        <AccordionItem value="1">
          <AccordionTrigger className="px-3 py-2 mt-4">
            Debugging unter Windows
          </AccordionTrigger>
          <AccordionContent className="px-4">
            <p className="font-medium mb-1">
              Bei Fehlern unter Windows mit Rancher Desktop:
            </p>
            <p>
              Wenn bei dem Öffnen des Dev-Containers ein Fehler auftritt, öffne
              das Terminal. Öffne WSL mit dem Kommando{" "}
              <CommandCopy>wsl</CommandCopy>. Anschließend navigiere mithilfe
              des folgenden Kommandos in den runtime Ordner:
            </p>
            <CodeCopy className="my-2">
              cd ~/../../mnt/wslg/runtime-dir
            </CodeCopy>
            <p>Lösche dann zwei Dateien:</p>
            <CodeCopy className="my-2">
              rm -rf wayland-0 && rm -rf wayland-0.lock
            </CodeCopy>
            <p>Versuche nun den Container neu zu öffnen.</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export const InstallRancherStep = () => {
  return (
    <>
      <h2>Docker installieren</h2>
      <p>
        {"Dafür kannst du  "}
        <Link href="https://rancherdesktop.io/" target="_blank">
          Rancher Desktop
        </Link>
        {" verwenden oder Docker Desktop, wenn du eine Lizenz dafür hast."}
      </p>
    </>
  );
};

export const DockerPull = () => {
  const dockerHost =
    process.env.NEXT_PUBLIC_DOCKER_REGISTRY_HOST || "docker.voelkerlabs.de";
  const dockerImage =
    process.env.NEXT_PUBLIC_DOCKER_EVALUATION_IMAGE || "evaluation";
  return (
    <>
      <h2>Docker Image Pull</h2>
      <p>
        Stelle sicher, dass die Docker-Engine auf deinem Gerät läuft.
        {/* Dann logge dich in dem Docker Registry ein, indem du den folgenden Befehl
      in deiner Konsole ausführst. Nutze das selbe Passwort wie für diese
      Webseite: */}
        {/* <CodeCopy className="my-4">{`docker login --username exxeta --password-stdin ${dockerHost}`}</CodeCopy> */}
        {
          " Anschließend kannst du das Docker Image mit dem folgenden Befehl pullen:"
        }
      </p>
      <CodeCopy className="my-4">{`docker pull ${dockerHost}/${dockerImage}`}</CodeCopy>
    </>
  );
};

const DevContainer = () => {
  return (
    <>
      <h2>Dev Container</h2>
      <p>
        Öffne Visual Studio Code in einem neuen Ordner, den du für dieses
        {" Projekt verwenden möchtest. Stelle sicher, dass die Erweiterung "}
        <Link
          href="https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers"
          target="_blank"
        >
          Dev Containers
        </Link>{" "}
        installiert ist. Erstelle eine neue Datei{" "}
        <FileCopy>.devcontainer/devcontainer.json</FileCopy>
        {" mit dem folgenden Inhalt:"}
      </p>
      <CodeCopy className="my-4 max-w-2xl" textArea>
        {(process.env.NEXT_PUBLIC_DEV_CONTAINER_JSON || "error")
          .replace(
            "placeholder",
            process.env.NEXT_PUBLIC_DOCKER_REGISTRY_HOST +
              "/" +
              process.env.NEXT_PUBLIC_DOCKER_EVALUATION_IMAGE
          )
          .replaceAll("\\'", '"')}
      </CodeCopy>
      <p>
        Dann öffne die Kommando-Palette mit <Kbd>⌘+Shift+P</Kbd>
        {" bzw. "}
        <Kbd>Strg+Shift+P</Kbd> und gebe{" "}
        <CommandCopy>&gt;Dev Containers: Reopen in Container</CommandCopy>.
        Visual Studio Code wird jetzt den Dev Container starten und dich
        automatisch darin verbinden.
      </p>
      <Debugging />
    </>
  );
};

const FinishStep = () => {
  return (
    <>
      <h2>Fertig</h2>
      <p className="mb-4">
        Es sind bereits alle Abhängigkeiten installiert. Es sind ebenfalls ein
        paar VS-Code-Erweiterungen installiert. Falls du noch eigene
        Erweiterungen installieren möchtest, kannst du das jetzt tun. Dann
        kannst du mit der ersten Aufgabe anfangen.
      </p>
      <NextButton />
    </>
  );
};

const Setup = () => {
  const { setProgress, progress } = useMainStore();
  const steps = [
    <InstallRancherStep key={0} />,
    <DockerPull key={1} />,
    <DevContainer key={2} />,
    <FinishStep key={3} />,
  ];

  useEffect(() => {
    if (progress === "setup") setProgress("task1");
  }, [setProgress, progress]);

  return (
    <div>
      <h1>Aufsetzen der Umgebung</h1>
      <p className="mb-6">
        Das Projekt wird in einem Docker Dev Container ausgeführt, damit die
        Entwicklungsumgebung ohne großen Aufwand eingerichtet werden kann. Die
        Abhängigkeiten sind in dem Projekt bereits installiert. Für das
        Aufsetzen sind folgende Schritte notwendig:
      </p>
      <ol className="mt-4 space-y-2">
        {steps.map((step, index) => (
          <li key={index} className="flex gap-4">
            <span className="flex flex-col items-center gap-2">
              <span className="bg-primary size-7 flex text-primary-foreground items-center justify-center rounded-md shrink-0">
                {index + 1}
              </span>
              {index < steps.length - 1 && (
                <div className="w-px bg-border h-full box-border" />
              )}
            </span>
            <div className="mb-2">{step}</div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Setup;
