type QuantityStepperProps = {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

export function QuantityStepper({
  quantity,
  onIncrement,
  onDecrement,
}: QuantityStepperProps) {
  return (
    <div className="flex justify-center gap-2">
      <button
        onClick={onDecrement}
        className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-700 text-gray-100 transition hover:bg-gray-600"
        aria-label="Disminuir cantidad"
      >
        −
      </button>
      <span
        aria-live="polite"
        className="w-4 text-center text-sm text-gray-100"
      >
        {quantity}
      </span>
      <button
        onClick={onIncrement}
        className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-700 text-gray-100 transition hover:bg-gray-600"
        aria-label="Aumentar cantidad"
      >
        +
      </button>
    </div>
  );
}
