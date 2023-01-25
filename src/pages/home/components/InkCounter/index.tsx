import { useContext } from "react";
import { MinusCircle, PlusCircle } from "phosphor-react";

import { InkColors, INKS_TRANSLATE } from "../../../../utils/inks";
import { PrinterContext } from "../../../../contexts/PrinterContext";

import { InkCounterContainer, CounterContainer, LeftBar, Counter, AddInk, RemoveInk } from "./styles";

interface InkCounterProps {
  amount: number;
  color: InkColors;
  printerId: number;
}

export function InkCounter({ printerId, color, amount }: InkCounterProps) {
  const { addInk, removeInk } = useContext(PrinterContext);

  return (
    <InkCounterContainer>
      <CounterContainer>
        <strong>cartucho {INKS_TRANSLATE[color]}</strong>
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
