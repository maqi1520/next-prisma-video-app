import { describe, expect, it, vi } from "vitest";
import { render, screen, renderHook, act } from "@testing-library/react";
import useOnScreen from "@/hooks/useOnScreen";
import { useRef } from "react";

const IntersectionObserverMock = vi.fn((a) => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn(),
}));

vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);

function App() {
  const ref = useRef();
  const visible = useOnScreen(ref);
  return (
    <div role="test" ref={ref}>
      {visible ? "true" : "false"}
    </div>
  );
}

describe("useOnScreen", () => {
  it("default value is false，After callback value should be true", async () => {
    render(<App />);

    const callback = IntersectionObserverMock.mock.calls[0][0];

    expect(screen.getByRole("test")).toHaveTextContent("false");

    act(() => {
      callback([{ isIntersecting: true }]);
    });
    expect(screen.getByRole("test")).toHaveTextContent("true");
  });
});
