import { Envelope, Printer as PrinterIcon } from "phosphor-react";

import { Printer } from "../../../../contexts/PrinterContext";

import { PrinterContainer, PrinterInfo, InkStatus, RequestInkButton } from "./styles";

interface PrinterProps {
  printer: Printer;
  setPrinter: (printerId: number) => void;
}

const INKS = {
  blue: "azul",
  black: "preto",
  red: "vermelho",
  yellow: "amarelo",
} as const;

export function PrinterCard({ printer, setPrinter }: PrinterProps) {
  const emptyInks = printer.stock.filter((ink) => ink.amount === 0);
  const hasInkAlert = !!emptyInks.length;

  const mail = {
    to: "anapaula@ngr.com.br",
    subject: `Requisição de tinta para impressora - ${printer.name}`,
    cc: "almoxarifado.plaxtex@grupopiatex.com.br, almoxarifadopme@grupopiatex.com.br, renantarifa@grupopiatex.com.br",
    bcc: "ti@grupopiatex.com.br",
    body: `
    Olá! %0D%0A %0D%0A
    Venho requisitar tonner para a impressora ${printer.name} na cor: %0D%0A
    - ${emptyInks.map((ink) => {
      return `${INKS[ink.color].toUpperCase()}`;
    })}
    `,
  };

  const mailHref = `mailto:${mail.to},?subject=${mail.subject}&cc=${mail.cc}&bcc=${mail.bcc}&body=${mail.body}`;

  return (
    <PrinterContainer hasInkAlert={hasInkAlert} onClick={() => setPrinter(printer.id)}>
      <div className="icon">
        <PrinterIcon size={32} weight={"thin"} />
      </div>

      <PrinterInfo>
        <strong>{printer.name}</strong>
        <span>{printer.department}</span>
        <InkStatus hasInkAlert={hasInkAlert}>
          <span>Status do estoque:</span>
          <strong>{hasInkAlert ? `em falta` : `ok `} </strong>
        </InkStatus>
      </PrinterInfo>

      {hasInkAlert && (
        <RequestInkButton href={mailHref}>
          <Envelope size={32} weight="thin" />
          <strong>Solicitar tinta!</strong>
        </RequestInkButton>
      )}
    </PrinterContainer>
  );
}
