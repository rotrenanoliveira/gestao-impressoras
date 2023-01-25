import { useCallback, useContext } from "react";
import { Envelope, Printer as PrinterIcon } from "phosphor-react";

import { Printer, PrinterContext } from "../../contexts/PrinterContext";

import { PrinterContainer, PrinterInfo, InkStatus, RequestInkButton } from "./styles";

interface PrinterProps {
  printer: Printer;
}

export function PrinterCard({ printer }: PrinterProps) {
  const { selectPrinter } = useContext(PrinterContext);

  const printerEmptyInkStock = printer.stock.filter((ink) => ink.amount === 0);
  const hasInkStockAlert = !!printerEmptyInkStock.length;

  const generateMail = useCallback(() => {
    if (!hasInkStockAlert) return;

    const mail = {
      to: "",
      subject: ``,
      cc: "",
      bcc: "",
      body: ``,
    };

    return `mailto:${mail.to},?subject=${mail.subject}&cc=${mail.cc}&bcc=${mail.bcc}&body=${mail.body}`;
  }, [hasInkStockAlert]);

  function handleSelectPrinter() {
    selectPrinter(printer.id);
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
          <span>Stock status:</span>
          <strong>{hasInkStockAlert ? `not ok` : `ok `} </strong>
        </InkStatus>
      </PrinterInfo>

      {hasInkStockAlert && (
        <RequestInkButton href={generateMail()} target={"_blank"}>
          <Envelope size={32} weight="thin" />
          <strong>Request tonner!</strong>
        </RequestInkButton>
      )}
    </PrinterContainer>
  );
}
