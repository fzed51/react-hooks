import { useRef, useEffect } from "react";

export function useRenderCount(componentName?: string) {
  const renderCount = useRef(0);
  const mountCount = useRef(0);
  const isFirstRender = useRef(true);

  // Compteur de montage pour détecter StrictMode
  useEffect(() => {
    mountCount.current += 1;
    return () => {
      // En StrictMode, ce cleanup s'exécute puis le useEffect se re-exécute
    };
  }, []);

  useEffect(() => {
    renderCount.current += 1;

    const isStrictMode = isFirstRender.current && mountCount.current > 1;
    const strictModeFlag = isStrictMode ? " [StrictMode]" : "";

    console.log(
      `${componentName || "Component"} render #${renderCount.current}${strictModeFlag}`,
    );

    isFirstRender.current = false;
  });

  return renderCount.current;
}
