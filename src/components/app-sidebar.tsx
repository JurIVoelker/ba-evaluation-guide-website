import { useMainStore } from "@/store/main-store";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { CheckIcon, Loader2, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import CodeCopy from "./code-copy";

const steps: Record<string, SidebarStep> = {
  intro: { label: "Einführung" },
  setup: { label: "Setup" },
  task1: { label: "Aufgabe 1" },
  task2: { label: "Aufgabe 2" },
  uploading: { label: "Ergebnisse hochladen" },
  questionnaire: { label: "Fragebogen" },
  done: { label: "Fertig" },
};

type SidebarStep = {
  label: string;
  hidden?: boolean;
};

const stepArray = Object.keys(steps).map((key) => ({ ...steps[key], key }));

export type Progress = keyof typeof steps;

const getStepIcon = (
  stepKey: Progress,
  currentProgress: string
): React.ReactNode => {
  const styles = "text-gray-500";

  if (currentProgress === "done") return <CheckIcon className={styles} />;

  if (stepKey === currentProgress) {
    return <Loader2 className={cn("animate-spin", styles)} />;
  }
  const index = stepArray.findIndex((step) => step.key === stepKey);
  const currentIndex = stepArray.findIndex(
    (step) => step.key === currentProgress
  );

  if (index < currentIndex) return <CheckIcon className={styles} />;
  return <Minus className={styles} />;
};

const AppSidebar = () => {
  const { progress, activeStep, setActiveStep, uuid } = useMainStore();

  const stepDisabled = (stepKey: Progress) => {
    const index = stepArray.findIndex((step) => step.key === stepKey);
    const currentIndex = stepArray.findIndex((step) => step.key === progress);
    return index > currentIndex;
  };

  return (
    <Sidebar collapsible="none" className="fixed">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="pt-8">
            <SidebarMenu>
              {stepArray.map((step, i) => (
                <SidebarMenuItem key={i}>
                  <SidebarMenuButton
                    onClick={() => setActiveStep(step.key as Progress)}
                    disabled={stepDisabled(step.key as Progress)}
                    variant="default"
                    isActive={step.key === activeStep}
                  >
                    {getStepIcon(step.key, progress)}
                    {step.label}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {uuid && (
          <SidebarContent className="p-1 pb-4">
            <span>
              <p className="text-sm pb-1">Deine Id</p>
              <CodeCopy className="text-sm">{uuid}</CodeCopy>
            </span>
          </SidebarContent>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
