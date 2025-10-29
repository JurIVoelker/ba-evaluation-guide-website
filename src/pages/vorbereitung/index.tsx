import Layout from "@/components/layout";
import { DockerPull, InstallRancherStep } from "@/components/steps/setup";

const FinishStep = () => {
  return (
    <>
      <h2>Fertig</h2>
      <p className="mb-4">
        Jetzt hast du alle notwendigen Voraussetzungen installiert und bist für
        die Evaluation bestens vorbereitet.
      </p>
    </>
  );
};

const VorbereitungPage = () => {
  const steps = [
    <InstallRancherStep key={0} />,
    <DockerPull key={1} />,
    <FinishStep key={2} />,
  ];
  return (
    <Layout hideSidebar>
      <h1>Vorbereitung</h1>
      <p>
        Damit das Aufsetzen der Evaluation schneller geht, kannst du bereits
        vorher notwendige Software und die Entwicklungsumgebung herunterladen.
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
    </Layout>
  );
};

export default VorbereitungPage;
