import { useContext, useState } from "react";
import { MinusCircle, PlusCircle } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";

import { InkColors } from "../../utils/inks";
import { RemoveInkModal } from "../RemoveInkModal";
import { PrinterContext } from "../../contexts/PrinterContext";

import { InkCounterContainer, CounterContainer, LeftBar, Counter, InsertInkButton, RemoveInkButton } from "./styles";

interface InkCounterProps {
  amount: number;
  color: InkColors;
}

export function InkCounter({ color, amount }: InkCounterProps) {
  const [open, setOpen] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);
  const { insertInk } = useContext(PrinterContext);

  async function handleInsertInk() {
    setIsSubmited(true);
    const response = await insertInk(color);

    if (response.success) {
      setIsSubmited(false);
    }
  }

  function closeModal() {
    setOpen(false);
  }

  return (
    <InkCounterContainer>
      <CounterContainer>
        <strong>Toner - {color}</strong>
        <Counter>
          <div>
            <InsertInkButton onClick={handleInsertInk} disabled={isSubmited}>
              <PlusCircle size={24} weight="thin" />
            </InsertInkButton>

            <Dialog.Root open={open} onOpenChange={setOpen}>
              <Dialog.Trigger asChild>
                <RemoveInkButton>
                  <MinusCircle size={24} weight="thin" />
                </RemoveInkButton>
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
