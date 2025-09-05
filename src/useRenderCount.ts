import { useRef, useEffect } from "react";

export function useRenderCount(componentName?: string) {
  const renderCount = useRef(0);
  const mountCount = useRef(0);
  const isFirstRender = useRef(true);

  useEffect(() => {
    mountCount.current += 1;
    return () => {};
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
