import { Envelope, Printer as PrinterIcon } from "phosphor-react";

import { Printer as PrinterData } from "../../../../contexts/PrinterContext";

import { PrinterContainer, PrinterInfo, InkStatus, RequestInkButton } from "./styles";

interface PrinterProps {
  printer: PrinterData;
  setPrinter: (printerId: number) => void;
}

const INKS = {
  blue: "azul",
  black: "preto",
  red: "vermelho",
  yellow: "amarelo",
} as const;

export function Printer({ printer, setPrinter }: PrinterProps) {
  const emptyInks = printer.stock.filter((ink) => ink.amount === 0);

  const hasAlert = !!emptyInks.length;

  const mailTo = "anapaula@ngr.com.br";
  const mailSubject = `Requisição de tinta para impressora - ${printer.name.toUpperCase()}`;
  const mailCc =
    "almoxarifado.plaxtex@grupopiatex.com.br, almoxarifadopme@grupopiatex.com.br, renantarifa@grupopiatex.com.br";
  const mailBcc = "ti@grupopiatex.com.br";
  const mailBody = `
    Olá!

    Venho requisitar tonner para a impressora ${printer.name} na cor ${INKS[emptyInks[0]?.color]}.

  `;

  const mailHref = `mailto:${mailTo},?subject=${mailSubject}&cc=${mailCc}&bcc=${mailBcc}&body=${mailBody}`;

  return (
    <PrinterContainer hasAlert={hasAlert} onClick={() => setPrinter(printer.id)}>
      <div className="icon">
        <PrinterIcon size={32} weight={"thin"} />
      </div>

      <PrinterInfo>
        <strong>{printer.name}</strong>
        <span>{printer.department}</span>
        <InkStatus hasAlert={hasAlert}>
          <span>Status do estoque:</span>
          <strong>{hasAlert ? `em falta` : `ok `} </strong>
        </InkStatus>
      </PrinterInfo>

      {hasAlert && (
        <RequestInkButton href={mailHref}>
          <Envelope size={32} weight="thin" />
          <strong>Solicitar tinta!</strong>
        </RequestInkButton>
      )}
    </PrinterContainer>
  );
}
