import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

function App() {
  return <div>app</div>;
}

describe("App", () => {
  it("it should be render", () => {
    render(<App />);
    expect(screen.getByText("app")).toBeInTheDocument();
  });
});
