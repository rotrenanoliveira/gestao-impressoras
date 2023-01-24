import { MinusCircle, PlusCircle } from "phosphor-react";
import { useContext } from "react";
import { PrinterContext } from "../../../../contexts/PrinterContext";

import { InkCounterContainer, CounterContainer, LeftBar, Counter, AddInk, RemoveInk } from "./styles";

interface InkCounterProps {
  amount: number;
  printerId: number;
  color: "black" | "blue" | "red" | "yellow";
}

const INKS = {
  blue: "azul",
  black: "preto",
  red: "vermelho",
  yellow: "amarelo",
} as const;

export function InkCounter({ printerId, color, amount }: InkCounterProps) {
  const { addInk, removeInk } = useContext(PrinterContext);

  return (
    <InkCounterContainer>
      <CounterContainer>
        <strong>cartucho {INKS[color]}</strong>
        <Counter>
          <div>
            <AddInk onClick={() => addInk(printerId, { color, amount })}>
              <PlusCircle size={24} weight="thin" />
            </AddInk>

            <RemoveInk onClick={() => removeInk(printerId, { color, amount })}>
              <MinusCircle size={24} weight="thin" />
            </RemoveInk>
          </div>

          <span>{amount}</span>
        </Counter>
      </CounterContainer>
      <LeftBar inkColor={color} />
    </InkCounterContainer>
  );
}
