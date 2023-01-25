import { useContext, useState } from "react";
import { MinusCircle, PlusCircle } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";

import { InkColors, INKS_TRANSLATE } from "../../utils/inks";
import { PrinterContext } from "../../contexts/PrinterContext";

import { InkCounterContainer, CounterContainer, LeftBar, Counter, AddInk, RemoveInk } from "./styles";
import { RemoveInkModal } from "../RemoveInkModal";

interface InkCounterProps {
  amount: number;
  color: InkColors;
}

export function InkCounter({ color, amount }: InkCounterProps) {
  const [open, setOpen] = useState(false);
  const { insertInk } = useContext(PrinterContext);

  function handleInsertInk() {
    insertInk(color);
  }

  function closeModal() {
    setOpen(false);
  }

  return (
    <InkCounterContainer>
      <CounterContainer>
        <strong>cartucho {INKS_TRANSLATE[color]}</strong>
        <Counter>
          <div>
            <AddInk onClick={handleInsertInk}>
              <PlusCircle size={24} weight="thin" />
            </AddInk>

            <Dialog.Root open={open} onOpenChange={setOpen}>
              <Dialog.Trigger asChild>
                <RemoveInk>
                  <MinusCircle size={24} weight="thin" />
                </RemoveInk>
              </Dialog.Trigger>

              <RemoveInkModal inkColor={color} closeModal={closeModal} />
            </Dialog.Root>
          </div>

          <span>{amount}</span>
        </Counter>
      </CounterContainer>
      <LeftBar inkColor={color} />
    </InkCounterContainer>
  );
}
