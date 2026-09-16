import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { QuantityStepper } from "./QuantityStepper";

describe("QuantityStepper", () => {
  it("muestra la cantidad actual", () => {
    render(
      <QuantityStepper
        quantity={3}
        onIncrement={vi.fn()}
        onDecrement={vi.fn()}
      />,
    );

    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("llama a onIncrement al hacer click en el botón de aumentar", () => {
    const onIncrement = vi.fn();

    render(
      <QuantityStepper
        quantity={1}
        onIncrement={onIncrement}
        onDecrement={vi.fn()}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Aumentar cantidad" }),
    );

    expect(onIncrement).toHaveBeenCalledTimes(1);
  });

  it("llama a onDecrement al hacer click en el botón de disminuir", () => {
    const onDecrement = vi.fn();

    render(
      <QuantityStepper
        quantity={1}
        onIncrement={vi.fn()}
        onDecrement={onDecrement}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Disminuir cantidad" }),
    );

    expect(onDecrement).toHaveBeenCalledTimes(1);
  });
});
