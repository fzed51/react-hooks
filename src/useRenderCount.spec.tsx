import { StrictMode } from "react";
import { render, act } from "@testing-library/react";
import { useRenderCount } from "./useRenderCount";

describe("useRenderCount", () => {
  it("compte et log le nombre de rendus", () => {
    const logs: string[] = [];
    const originalLog = console.log;
    console.log = (msg: string) => logs.push(msg);

    function TestComponent() {
      useRenderCount("TestComponent");
      return <div>Test</div>;
    }

    const { rerender } = render(<TestComponent />);
    rerender(<TestComponent />);
    rerender(<TestComponent />);

    expect(logs).toContain("TestComponent render #1");
    expect(logs).toContain("TestComponent render #2");
    expect(logs).toContain("TestComponent render #3");

    console.log = originalLog;
  });

  it("utilise le nom par défaut si non fourni", () => {
    const logs: string[] = [];
    const originalLog = console.log;
    console.log = (msg: string) => logs.push(msg);

    function TestComponent() {
      useRenderCount();
      return <div>Test</div>;
    }

    render(<TestComponent />);
    expect(logs[0]).toMatch(/^Component render #1/);
    console.log = originalLog;
  });

  it("détecte StrictMode au premier rendu", () => {
    const logs: string[] = [];
    const originalLog = console.log;
    console.log = (msg: string) => {
      logs.push(msg);
      originalLog(msg);
    };

    function TestComponent() {
      useRenderCount("StrictComponent");
      return <div>Strict</div>;
    }

    // Simule StrictMode (double montage)
    act(() => {
      render(
        <StrictMode>
          <TestComponent />
        </StrictMode>,
      );
    });

    // Cherche le flag StrictMode dans le premier log
    expect(logs.some((l) => l.includes("[StrictMode]"))).toBe(true);
    console.log = originalLog;
  });

  it("retourne le nombre de rendus courant", () => {
    let count = 0;
    function TestComponent() {
      count = useRenderCount("TestComponent");
      return <div>Test</div>;
    }
    const { rerender } = render(<TestComponent />);
    rerender(<TestComponent />);
    expect(count).toBe(2);
  });
});
