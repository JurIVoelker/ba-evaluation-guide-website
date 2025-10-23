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
      <p>test</p>
      <NextButton />
    </div>
  );
};

export default Intro;
