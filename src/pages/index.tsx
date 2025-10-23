import { Progress } from "@/components/app-sidebar";
import Done from "@/components/steps/done";
import Fallback from "@/components/steps/fallback";
import Intro from "@/components/steps/intro";
import MuiTask from "@/components/steps/mui-task";
import Questionnaire from "@/components/steps/questionnaire";
import Results from "@/components/steps/results";
import Setup from "@/components/steps/setup";
import ShadcnTask from "@/components/steps/shadcn-task";
import { useMainStore } from "@/store/main-store";
import { useTaskStore1, useTaskStore2 } from "@/store/task-store";
import { useEffect } from "react";

export default function Home() {
  const { activeStep, group, setGroup, progress, ready, isReady } =
    useMainStore();

  const getTaskComponent = (
    condition: boolean,
    index: number,
    isReady: boolean
  ) => {
    if (condition === null) return <Fallback />;
    const store = index === 1 ? useTaskStore1 : useTaskStore2;
    return condition ? (
      <ShadcnTask store={store} isReady={isReady} />
    ) : (
      <MuiTask store={store} isReady={isReady} />
    );
  };

  useEffect(() => {
    const fetchGroup = async () => {
      const response = await fetch("/api/group");
      const data = (await response.json()) as { group: "A" | "B" };
      setGroup(data.group);
    };

    if (isReady && group === null) {
      fetchGroup();
    }
  }, [group, setGroup, isReady]);

  useEffect(() => {
    ready();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const componentMap: { [key in Progress]: React.ReactNode } = {
    intro: <Intro />,
    uploading: <Results />,
    setup: <Setup />,
    task1:
      group === null ? (
        <Fallback />
      ) : (
        getTaskComponent(group === "A", 1, progress === "task1")
      ),
    task2:
      group === null ? (
        <Fallback />
      ) : (
        getTaskComponent(group === "B", 2, progress === "task2")
      ),
    questionnaire: <Questionnaire key={4} />,
    done: <Done key={5} />,
  };
  const Component = componentMap[activeStep] || <Fallback />;

  return <div>{Component}</div>;
}
