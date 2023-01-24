import { useState } from "react";
import { MinusCircle, PlusCircle } from "phosphor-react";

import { InkCounterContainer, CounterContainer, LeftBar, Counter, AddInk, RemoveInk } from "./styles";

export function InkCounter() {
  const [counter, setCounter] = useState(0);

  return (
    <InkCounterContainer>
      <CounterContainer>
        <strong>cartucho amarelo</strong>
        <Counter>
          <div>
            <AddInk onClick={() => setCounter((state) => state + 1)}>
              <PlusCircle size={24} weight="thin" />
            </AddInk>

            <RemoveInk onClick={() => setCounter((state) => state - 1)}>
              <MinusCircle size={24} weight="thin" />
            </RemoveInk>
          </div>

          <span>{counter}</span>
        </Counter>
      </CounterContainer>
      <LeftBar inkColor="yellow" />
    </InkCounterContainer>
  );
}
