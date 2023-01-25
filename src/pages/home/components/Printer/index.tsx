import { useCallback, useContext } from "react";
import { Envelope, Printer as PrinterIcon } from "phosphor-react";

import { Printer, PrinterContext } from "../../../../contexts/PrinterContext";
import { INKS_TRANSLATE } from "../../../../utils/inks";

import { PrinterContainer, PrinterInfo, InkStatus, RequestInkButton } from "./styles";

interface PrinterProps {
  printer: Printer;
  setPrinter: (printerId: number) => void;
}

export function PrinterCard({ printer, setPrinter }: PrinterProps) {
  const { hasInkStockAlert, printerEmptyInkStock } = useContext(PrinterContext);

  const generateMail = useCallback(() => {
    if (!hasInkStockAlert) return;

    const mail = {
      to: "anapaula@ngr.com.br",
      subject: `Requisição de tinta para impressora - ${printer.name}`,
      cc: "almoxarifado.plaxtex@grupopiatex.com.br, almoxarifadopme@grupopiatex.com.br, renantarifa@grupopiatex.com.br",
      bcc: "ti@grupopiatex.com.br",
      body: `
      Olá! %0D%0A %0D%0A
      Venho requisitar tonner para a impressora ${printer.name} na cor: %0D%0A
      - ${printerEmptyInkStock.map((ink) => {
        return `${INKS_TRANSLATE[ink.color].toUpperCase()}`;
      })}
      `,
    };

    return `mailto:${mail.to},?subject=${mail.subject}&cc=${mail.cc}&bcc=${mail.bcc}&body=${mail.body}`;
  }, [hasInkStockAlert, printer.name, printerEmptyInkStock]);

  function handleSelectPrinter() {
    setPrinter(printer.id);
  }

  return (
    <PrinterContainer hasInkAlert={hasInkStockAlert} onClick={handleSelectPrinter}>
      <div className="icon">
        <PrinterIcon size={32} weight={"thin"} />
      </div>

      <PrinterInfo>
        <strong>{printer.name}</strong>
        <span>{printer.department}</span>
        <InkStatus hasInkAlert={hasInkStockAlert}>
          <span>Status do estoque:</span>
          <strong>{hasInkStockAlert ? `em falta` : `ok `} </strong>
        </InkStatus>
      </PrinterInfo>

      {hasInkStockAlert && (
        <RequestInkButton href={generateMail()}>
          <Envelope size={32} weight="thin" />
          <strong>Solicitar tinta!</strong>
        </RequestInkButton>
      )}
    </PrinterContainer>
  );
}
