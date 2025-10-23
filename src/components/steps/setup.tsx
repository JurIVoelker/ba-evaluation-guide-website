import Link from "next/link";
import CodeCopy from "../code-copy";
import { useMainStore } from "@/store/main-store";
import { useEffect } from "react";
import NextButton from "../next-button";

const InstallRancherStep = () => {
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

const DockerLogin = () => {
  const dockerHost =
    process.env.NEXT_PUBLIC_DOCKER_REGISTRY_HOST || "docker.voelkerlabs.de";
  const dockerImage =
    process.env.NEXT_PUBLIC_DOCKER_EVALUATION_IMAGE || "evaluation";
  return (
    <>
      <h2>Docker Image Pull</h2>
      <p>
        Bevor das Docker Image gepulled wird, stelle Sicher, dass die Docker
        Engine auf deinem Gerät läuft. Dann logge dich in dem Docker Registry
        ein, indem du den folgenden Befehl in deiner Konsole ausführst. Nutze
        das selbe Passwort wie für diese Webseite:
      </p>
      <CodeCopy className="my-4">{`docker login --username exxeta --password-stdin ${dockerHost}`}</CodeCopy>
      <p>
        Anschließend kannst du das Docker Image mit dem folgenden Befehl pullen:
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
        {
          "Um den Dev Container zu verwenden, öffne Visual Studio Code und stelle sicher, dass die Erweiterung "
        }
        <Link
          href="https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers"
          target="_blank"
        >
          Dev Containers
        </Link>{" "}
        installiert ist. TODO
      </p>
    </>
  );
};

const FinishStep = () => {
  return (
    <>
      <h2>Fertig</h2>
      <p className="mb-4">Du kannst jetzt mit der ersten Aufgabe anfangen</p>
      <NextButton />
    </>
  );
};

const Setup = () => {
  const { setProgress, progress } = useMainStore();
  const steps = [
    <InstallRancherStep key={0} />,
    <DockerLogin key={1} />,
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
