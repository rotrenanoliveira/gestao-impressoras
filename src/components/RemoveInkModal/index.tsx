import { useContext } from "react";
import { X } from "phosphor-react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import * as z from "zod";

import { InkColors } from "../../utils/inks";
import { PrinterContext } from "../../contexts/PrinterContext";

import { CloseButton, Content, Overlay } from "./styles";
import { useForm } from "react-hook-form";

const newTransactionFormSchema = z.object({
  deliveryTo: z.string(),
});

type NewTransactionFormInput = z.infer<typeof newTransactionFormSchema>;

interface RemoveInkModalProps {
  inkColor: InkColors;
  closeModal: () => void;
}

export function RemoveInkModal({ inkColor, closeModal }: RemoveInkModalProps) {
  const { removeInk } = useContext(PrinterContext);

  const {
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<NewTransactionFormInput>({
    resolver: zodResolver(newTransactionFormSchema),
  });

  function handleRemoveInk(data: NewTransactionFormInput) {
    removeInk(inkColor, data.deliveryTo);
    // Form reset
    reset();

    closeModal();
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Ink removal</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleRemoveInk)}>
          <input type="text" placeholder="Employee who removed the paint" {...register("deliveryTo")} required />

          <button type="submit" disabled={isSubmitting}>
            Save
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
