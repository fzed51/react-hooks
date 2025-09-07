import { useRef, useEffect } from "react";

export function useRenderCount(componentName?: string) {
  const renderCount = useRef(0);
  const mountCount = useRef(0);

  useEffect(() => {
    mountCount.current += 1;
    return () => {};
  }, []);

  useEffect(() => {
    renderCount.current += 1;

    const isStrictMode = mountCount.current > 1;
    const strictModeFlag = isStrictMode ? " [StrictMode]" : "";

    console.log(
      `${componentName || "Component"} render #${renderCount.current}${strictModeFlag}`,
    );
  });

  return renderCount.current;
}
